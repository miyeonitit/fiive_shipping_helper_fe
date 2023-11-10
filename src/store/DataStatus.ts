import { atom } from 'recoil'

// success, loading, fail
const statusState = atom<string>({
  key: 'status',
  default: '',
})

export { statusState }
