import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = '@auth/token'
const EMAIL_KEY = '@auth/email'


export async function setToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, token)
}

export async function getToken(): Promise<string | null> {
  const stored = await AsyncStorage.getItem(TOKEN_KEY)
  return stored
}


export async function clearToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY)
}

export async function setUserEmail(email: string): Promise<void> {
  await AsyncStorage.setItem(EMAIL_KEY, email)
}

export async function getUserEmail(): Promise<string | null> {
  const stored = await AsyncStorage.getItem(EMAIL_KEY)
  return stored
}

export async function clearUserEmail(): Promise<void> {
  await AsyncStorage.removeItem(EMAIL_KEY)
}


