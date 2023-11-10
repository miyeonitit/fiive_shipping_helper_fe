import { toast, cssTransition } from 'react-toastify'

type toastConfigType = {
  position: string
  autoClose: 3000
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  progress: any
  theme: string
}

const toastConfig: toastConfigType = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'colored',
}

// status value : 'success', 'fail'
export const handleToast = (status: string, message: string) => {
  return status === 'success'
    ? toast.success(message, toastConfig)
    : toast.error(message, toastConfig)
}
