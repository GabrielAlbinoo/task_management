import { getToken } from '@/services/token'
import axios from 'axios'

const baseURL = process.env.EXPO_PUBLIC_API_URL
const BASE_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const api = axios.create({
  baseURL,
  headers: BASE_HEADER,
  timeout: 15000,
})

api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }
  return config
})


