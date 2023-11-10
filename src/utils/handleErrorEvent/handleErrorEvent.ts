import { handleToast } from '../toast/handleToast'

export const handleErrorEvent = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      handleToast('error', '잘못된 데이터가 있어요.')
      break

    default:
      handleToast('error', '무엇인가 잘못되었어요.')
  }
}
