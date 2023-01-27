import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTh_TOKEN_STORAGE } from '@storage/storageConfig';

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTh_TOKEN_STORAGE, token)
}

export async function storageAuthTokenGet() {
  const token = await AsyncStorage.getItem(AUTh_TOKEN_STORAGE)
  return token
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTh_TOKEN_STORAGE)
}

