import axios from 'axios'

import { getCookie } from 'cookies-next'

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  withCredentials: true,
})

AxiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = getCookie('auth-token')

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

AxiosInstance.interceptors.response.use(
  (response) => {
    return response?.data.data
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export default AxiosInstance
