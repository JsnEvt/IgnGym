import axios, { AxiosInstance, AxiosError } from 'axios'

import { AppError } from '@utils/AppError'
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storagenAuthToken';

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}


const api = axios.create({
  baseURL: 'http://192.168.0.13:3333'
}) as APIInstanceProps;

//colocando as requisicoes no Array para processar com token atualizado:
let failedQueue: Array<PromiseType> = []
let isRefresing = false

//esta operacao visa obter o token atualizado durante o uso do aplicativo, caso
//nao obtenha o token, sera deslogado.
//abaixo: gerenciador do token, para interceptar o token e verificar se e valido ou nao.

api.registerInterceptTokenManager = signOut => {
  //verificando se o token e invalido:
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        //o novo token sera gerado aqui dentro. 
        //recuperando o refresh token:
        const { refresh_token } = await storageAuthTokenGet()

        if (!refresh_token) {
          signOut();
          return Promise.reject(requestError)
        }
        //colocando as requisicoes na fila de espera e processar com token atualizado

        //pegando a requisicao original:
        const originalRequestConfig = requestError.config;
        //em originalRequestConfig tem todas as configuracoes das requisicoes que sao feitas
        //para caso nao esteja relacionado diretamente com o token. Desloga o usuario
        //abaixo: adicionando o fluxo das requisicoes na fila/Array - failedQueue para ser
        //processada posteriormente.
        if (isRefresing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                resolve(api(originalRequestConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })
        }
        isRefresing = true

        //buscando pelo token atualizado:

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token })
            await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token })

            //reenviando as requisicoes:
            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
            }
            //atualizando o cabecalho:
            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            //percorrendo a fila de requisicoes:
            failedQueue.forEach(request => {
              request.onSuccess(data.token)
            })
            //para reprocessar as requisicoes:
            resolve(api(originalRequestConfig))


          } catch (error: any) {
            failedQueue.forEach(request => {
              request.onFailure(error)
            })

            signOut()
            reject(error)

          } finally {
            isRefresing = false;
            failedQueue = []
          }
        })
      }

      signOut()
    }

    //so chegara nessa parte caso nao seja erro relacionado ao token.
    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}


export { api }