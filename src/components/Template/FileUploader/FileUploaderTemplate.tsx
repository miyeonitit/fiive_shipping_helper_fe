import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import Papa from 'papaparse'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'

import AxiosHandler from '../../../api/AxiosHandler'
import { statusState } from '../../../store/DataStatus'
import { handleErrorEvent } from '@/utils/handleErrorEvent/handleErrorEvent'

import ShippingListFrameTable from '../../Organisms/ShippingList/ShippingListFrameTable'
import DataFetchLoading from '@/components/Organisms/DataFetchLoading/DataFetchLoading'

import { receiverInfomation } from '../../../../types/Receiver/ReceiverInfomation'

type receiverListType = Array<receiverInfomation>

type receiverFieldValueType = Array<string[]>
type shipNumber = Array<string>

type csvFileDetailParameter = {
  data: receiverFieldValueType
  errors: []
  meta: {
    aborted: boolean
    cursor: number
    delimiter: string
    linebreak: string
    truncated: boolean
  }
}

type shippingDetailUrl = {
  shippingDetailURL: string
}

type updatedStatusDataType = {
  shippingNumber: string
  shippingStatus: string
}

const TemplateWrapper = styled.div`
  min-height: calc(100vh - ${(props) => props.$height}px);
  padding: 10px 24px 100px;
  background-color: #f1f3f5;
`

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.6px;
  line-height: 130%;
  margin-bottom: 20px;
`

const FileUploadWrapper = styled.div`
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.08), 0 0 10px rgba(0, 0, 0, 0.06);
  background-color: white;
`

const FileUploadInfomation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`

const InfomationText = styled.span`
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.4px;
  line-height: 130%;
  color: #868e96;
`

const Bold = styled.span`
  color: #96f;
  font-weight: 600;
`

const FileUploaderWrapper = styled.div``

const FileUploaderBox = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 400px;
  padding: 16px 0px 16px 16px;
  margin-right: 12px;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.$status !== 'fail' ? '#dee2e6' : '#EE5453')};
  background-color: ${(props) =>
    props.$status !== 'fail' ? 'white' : '#FDEAEA'};

  &:hover {
    background-color: ${(props) =>
      props.$status !== 'fail' ? '#f8f9fa' : '#FFD8D8'};
  }
`

const FileInputBox = styled.div`
  display: inline-block;
  width: 100%;
`

const Label = styled.label`
  display: inline-block;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.4px;
  line-height: 130%;
  color: #868e96;
  cursor: pointer;
`

const FileName = styled(Label)`
  color: #212529;
  cursor: initial;
`

const Input = styled.input`
  display: none;
`

const InputStatusBox = styled.div`
  position: absolute;
  right: 40px;
  display: inline-flex;
  align-items: center;
`

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #dee2e6;
  border-top: 2px solid #212529;
  border-radius: 50%;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
`

const FileStatusIconBox = styled.div`
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
  transform: rotate(180deg);
`

const FileDeleteIcon = styled.div`
  display: flex;
  align-items: center;
  background-color: opacity;
  cursor: pointer;
`

const FileUploaderTemplate = () => {
  const Modal = dynamic(
    () =>
      import(
        '@/components/Organisms/Modal/ShippingDetailModal/ShippingDetailModal'
      ),
    {
      loading: () => <DataFetchLoading />,
    }
  )

  const [apiStatus, setApiStatus] = useRecoilState(statusState)

  const [receiverList, setReceiverList] = useState<receiverListType>([])
  const [shipNumberList, setShipNumberList] = useState<shipNumber>([])

  const [fileName, setFileName] = useState('')

  const [isDetailModalOn, setIsDetailModalOn] = useState<boolean>(false)
  const [detailShipNumber, setDetailShipNumber] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  // csv 파일 삭제 시 모든 value 초기화
  const resetFileData = () => {
    if (fileInputRef.current) {
      setFileName('')
      setReceiverList([])
      setShipNumberList([])

      setApiStatus('')

      fileInputRef.current.value = ''
    }
  }

  // csv 파일 첨부 후, 파일 데이터 가공
  const changeFileFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const fileReader = e.target.files[0]

    // change API sync status value
    setApiStatus('loading')

    // save csv file name
    setFileName(fileReader?.name)

    // read csv file detail data
    Papa?.parse(fileReader, {
      complete: (results: csvFileDetailParameter) => {
        const resultData: receiverFieldValueType = results.data

        // 1. 원본 필드 가공 (csv 파일상의 table 맨앞과 맨뒷쪽 tr 항목 제거)
        resultData.shift()
        resultData.splice(-2)

        // 2. csv 추출 데이터 type 변경 : Array -> Object
        const changeTypeReceiverList: receiverListType = resultData.map(
          (receiver: string[]) => ({
            id: receiver[0],
            shipItem: receiver[14],
            receiverName: receiver[17],
            receiverTelNumber: receiver[18],
            receiverAddress: receiver[19],
            reservationStatus: receiver[13],
            billNumber: receiver[7],
            plannedCollectPlace: receiver[1],
            receptionDate: receiver[2],
            expectedCollectionDate: receiver[3],
            collectionDate: receiver[4],
            reservationClassification: receiver[5],
            reservationNumber: receiver[6],
            senderId: receiver[8],
            senderName: receiver[9],
            sendedOrganizationName: receiver[10],
            senderTelNumber: receiver[11],
            senderAddress: receiver[12],
            quantity: receiver[15],
            receptionNumber: receiver[16],
            reservatedMedia: receiver[20],
          })
        )
        setReceiverList(changeTypeReceiverList)

        // 3. 운송장 번호에서 하이픈 (-) 제거
        const removeHipenInBillNumber = changeTypeReceiverList.map((receiver) =>
          receiver.billNumber.replace(/-/g, '')
        )
        setShipNumberList(removeHipenInBillNumber)

        // 4. 데이터 가공 완료 후, 바로 callback method 실행
        postshipNumber(changeTypeReceiverList, removeHipenInBillNumber)
      },
    })
  }

  const getDetailStatus = async (shippingNumber: string) => {
    try {
      const responseData: shippingDetailUrl = await AxiosHandler.get(
        `/crawling/cj/detail?shippingNumber=${shippingNumber}`
      )

      setIsDetailModalOn(true)
      setDetailShipNumber(responseData.shippingDetailURL)
    } catch (error) {
      const errorCode = error?.response.status

      handleErrorEvent(errorCode)
      console.error(error, 'error')
    }
  }

  const postshipNumber = async (
    AllReceiverList: receiverListType,
    AllBillNumberList: shipNumber
  ) => {
    try {
      const body = {
        shippingNumber: AllBillNumberList,
      }

      // 최신화 된 운송장번호와 배송상태의 최신 값 POST request
      const responseData: updatedStatusDataType[] = await AxiosHandler.post(
        `/crawling/cj`,
        body
      )

      // 1. 원래 receiverList의 운송장번호와 응답받은 운송장번호를 대조
      // 2. 운송장번호에 맞게, 배송상태 value 업데이트
      const updatedData = AllReceiverList.map((receiver) => {
        const findBillNumber = responseData.find(
          (updatedStatus: updatedStatusDataType) =>
            receiver.billNumber.replace(/-/g, '') ===
            updatedStatus.shippingNumber
        )

        return {
          ...receiver,
          reservationStatus: findBillNumber
            ? findBillNumber.shippingStatus
            : '확인불가',
        }
      })

      setReceiverList(updatedData)

      setApiStatus('success')
    } catch (error) {
      const errorCode = error?.response.status

      handleErrorEvent(errorCode)
      console.error(error, 'error')

      setApiStatus('fail')
    }
  }

  // detail modal 외부 영역 click & scroll 방지
  useEffect(() => {
    document.body.style.overflow = isDetailModalOn ? 'hidden' : ''
    document.body.style.pointerEvents = isDetailModalOn ? 'none' : ''
  }, [isDetailModalOn])

  return (
    <TemplateWrapper $height={65}>
      <HeaderTitle>배송 상태 조회</HeaderTitle>

      <FileUploadWrapper>
        <FileUploaderWrapper>
          {/* 파일 첨부 input box */}
          <FileUploaderBox $status={apiStatus}>
            <FileInputBox>
              <Label htmlFor='file'>
                {shipNumberList?.length > 0 ? (
                  <FileName>{fileName}</FileName>
                ) : (
                  <>
                    <Bold>클릭</Bold>하여 배송 목록 파일 업로드 하기
                  </>
                )}
              </Label>

              <Input
                type='file'
                id='file'
                accept='.csv'
                ref={fileInputRef}
                multiple={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeFileFormat(e)
                }
              />
            </FileInputBox>

            {apiStatus && (
              <InputStatusBox>
                {apiStatus === 'success' ? (
                  <Image
                    src='/svg/icon/check_circle_icon.svg'
                    width={16}
                    height={16}
                    alt='success_check_icon'
                  />
                ) : apiStatus === 'fail' ? (
                  <Image
                    src='/svg/icon/input_fail_icon.svg'
                    width={16}
                    height={16}
                    alt='fail_icon'
                  />
                ) : (
                  <LoadingSpinner />
                )}
              </InputStatusBox>
            )}

            <FileStatusIconBox>
              {shipNumberList?.length > 0 ? (
                <FileDeleteIcon onClick={() => resetFileData()}>
                  <Image
                    src='/svg/icon/delete_icon.svg'
                    width={16}
                    height={16}
                    alt='file_delete_icon'
                  />
                </FileDeleteIcon>
              ) : (
                <Image
                  src='/svg/icon/download_upload_icon.svg'
                  width={16}
                  height={16}
                  alt='file_upload_icon'
                />
              )}
            </FileStatusIconBox>
          </FileUploaderBox>

          {/* 파일 첨부 infomation icon & text */}
          <FileUploadInfomation>
            <Image
              src='/svg/icon/infomation_icon.svg'
              width={14}
              height={14}
              alt='infomation_icon'
            />
            <InfomationText>
              확장자가 <Bold>csv</Bold>인 CJ 대한통운 파일만 업로드 해주세요.
            </InfomationText>
          </FileUploadInfomation>
        </FileUploaderWrapper>
      </FileUploadWrapper>

      {/* csv 파일 데이터 리스팅 table */}
      <ShippingListFrameTable
        receiverList={receiverList}
        getDetailStatus={getDetailStatus}
        resetFileData={resetFileData}
      />

      {/* 배송 상태 상세 조회 modal */}
      {isDetailModalOn && (
        <Modal
          isDetailModalOn={isDetailModalOn}
          setIsDetailModalOn={setIsDetailModalOn}
          detailShipNumber={detailShipNumber}
        />
      )}
    </TemplateWrapper>
  )
}

export default FileUploaderTemplate
