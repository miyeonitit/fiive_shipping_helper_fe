import { atom } from 'recoil'

// JWT Authorization token
const authToken = atom<string>({
  key: 'Authorization',
  default: '',
})

export { authToken }
