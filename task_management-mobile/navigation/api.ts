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

// api.interceptors.request.use((config) => {
//   const token = ''
//   if (token) {
//     config.headers = config.headers ?? {}
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })


