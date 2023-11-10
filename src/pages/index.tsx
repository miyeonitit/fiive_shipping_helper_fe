import React, { ReactElement } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'

import LoadingModal from '../components/Organisms/Modal/Login/LoginModal'
import FileUploaderTemplate from '../components/Template/FileUploader/FileUploaderTemplate'

const index = () => {
  return (
    <>
      <LoadingModal />

      <FileUploaderTemplate />
      <ToastContainer />
    </>
  )
}

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default index
