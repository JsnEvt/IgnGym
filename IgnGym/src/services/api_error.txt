import { AppError } from '@utils/AppError'
import axios, { AxiosInstance } from 'axios'
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storagenAuthToken'

type PromiseType = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

type processQueueParams = {
  error: Error | null
  token: string | null
}

type RegisterInterceptTokenManagerProps = {
  signOut: () => void
  refreshTokenUpdated: (newToken: string) => void;

}

//abaixo: gerenciador para interceptar o token do usuario
type APInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: ({ }: RegisterInterceptTokenManagerProps) => () => void
}

export const api = axios.create({
  baseURL: 'http://192.168.0.13:3333'
}) as APInstanceProps

let isRefreshing = false //variavel para ver se esta havendo uma atualizacao do token
let failedQueye: Array<PromiseType> = []

const processQueue = ({ error, token = null }: processQueueParams): void => {
  failedQueye.forEach(request => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token)
    }
  })
  failedQueye = []
}


api.registerInterceptTokenManager = ({ signOut, refreshTokenUpdated }) => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async requestError => {
    if (requestError?.response?.status === 401) { //401 = requisicao nao autorizada. codigo relacionado ao token
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        //buscando pelo token atual no dispositivo do usuario
        const oldToken = await storageAuthTokenGet()
        if (!oldToken) { //se nao existe token, desloga o usuario
          signOut()
          //para parar a a funcao aqui:
          return Promise.reject(requestError)
        }
        //pode existir um momento em que o usuario fez uma requisicao, o tempo exipirou e o token 
        //ficou invalidado, podemos guardar as requisicoes para ser recuperadas posteriormente -
        //abaixo:
        const originalRequest = requestError.config //config tem todas as configuracoes da requisicao
        //a ideia e guardar as requisicoes originais em fila ate que o usuario retome as atividades com o novo token
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueye.push({ resolve, reject })
          })
            .then(token => {
              //atualizando o cabecalho da requisicao e executando ela novamente.
              originalRequest.headers.Authorization = `Bearer ${token}`
              return axios(originalRequest)
            })
            .catch((error) => {
              throw error
            })
        }
        isRefreshing = true //na primeira vez, ele nao entrara no if que retorna a promise.
        //ele buscara pelo token atualizado
        //quando isRefreshing estiver como true, ai entrara.
        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { token: oldToken })
            await storageAuthTokenSave(data.token) //salvando no dispositivo.
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`


            refreshTokenUpdated(data.token)
            processQueue({ error: null, token: data.token })

            console.log('Token atualizado!')

            resolve(originalRequest)
          } catch (error: any) {
            processQueue({ error, token: null })
            signOut()
            reject(error)
          } finally {
            isRefreshing = false
          }
        })
      }

      signOut() //para deslogar o usuario quando nao estiver diretamente relacionado ao token
    }


    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message)) //erro personalizado.
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}