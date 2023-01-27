import { UserDTO } from '@dtos/UserDTO';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '@services/api'
import { storageUserGet, storageUserSave, storageUserRemove } from '@storage/storageUser'
import { storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storagenAuthToken'
import { storageAuthTokenGet } from '@storage/storagenAuthToken'

export type AuthContextDataProps = {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  refreshedToken: string;
}


type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [refreshedToken, setRefreshedToken] = useState('')
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    //a linha abaixo mostra como anexar o token no cabecalho
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  function refreshTokenUpdated(newToken: string) {
    setRefreshedToken(newToken)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({ signOut, refreshTokenUpdated })
    return () => {
      subscribe() //limpando o registro da memoria
    }
  }, [signOut])

  return (<AuthContext.Provider value={{
    user,
    isLoadingUserStorageData,
    refreshedToken,
    signIn,
    signOut,
    updateUserProfile
  }}>
    {children}
  </AuthContext.Provider>
  )
}