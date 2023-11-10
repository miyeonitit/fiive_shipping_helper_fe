import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import styled from 'styled-components'
import { TableConfig, handleTableTrWidth } from '../../../../styles/tableStyle'

import { useRecoilState } from 'recoil'

import { statusState } from '@/store/DataStatus'
import { handleToast } from '@/utils/toast/handleToast'
import AxiosHandler from '../../../api/AxiosHandler'

import DataFetchLoading from '../DataFetchLoading/DataFetchLoading'
import EmptyShippingList from '@/components/Molecules/EmptyShippingList/EmptyShippingList'
import ShippingDataLine from '@/components/Molecules/ShippingDataLine/ShippingDataLine'

import { receiverInfomation } from '../../../../types/Receiver/ReceiverInfomation'
import { handleErrorEvent } from '@/utils/handleErrorEvent/handleErrorEvent'

const FileUploadContainer = styled.div`
  position: relative;
  margin-top: 24px;
  background-color: #f1f3f5;
`

const DataFetchLoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 6px;
`

const FileUploadWrapper = styled.div`
  padding: 24px;
  border-radius: 6px;
  overflow-x: visible;
  overflow-y: auto;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.08), 0 0 10px rgba(0, 0, 0, 0.06);
  background-color: white;
`

const FileUploadHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const NumberOfUser = styled.h2`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 130%;
`

const Bold = styled.span`
  color: #96f;
  font-weight: 600;
`

const PostButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 8px;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.4px;
  line-height: 100%;
  background-color: white;
  cursor: pointer;

  img {
    margin-right: 4px;
    transform: rotate(180deg);
  }

  &:hover {
    background-color: #f8f9fa;
  }
`

const TableWrapper = styled.table``

const TableHead = styled.thead`
  text-align: left;
`

const TableBody = styled.tbody``

const TableSectionLine = styled.tr`
  display: flex;
  padding: 8px 8px 12px 8px;
  border-bottom: 1px solid #f1f3f5;

  ${(props) =>
    props.$section === 'body' &&
    `
    border-bottom: unset;

    &:hover {
      background-color: #f8f9fa;
    }
`}
`

const TableSection = styled.th`
  ${TableConfig(700, '-0.4px')};
  ${(props) => handleTableTrWidth(props.$field)};
`

const ShippingList = ({
  receiverList,
  getDetailStatus,
  resetFileData,
}: any) => {
  const [containerHeight, setContainerHeight] = useState<number>(0)

  const containerRef = useRef<HTMLInputElement>(null)

  const [apiStatus] = useRecoilState(statusState)

  const postGoogleSheet = async () => {
    try {
      // id 필드 제거
      const removeIdField = receiverList.map((receiver) => {
        const { id, ...rest } = receiver
        return rest
      })

      const body = {
        receiverList: removeIdField,
      }

      // 최신화 된 운송장번호와 배송상태의 최신 값 POST request
      const responseData = await AxiosHandler.post(`/sheets`, body)

      handleToast('success', '전송이 완료되었어요.')

      // 첨부한 csv 파일과 데이터 초기화
      resetFileData()
    } catch (error) {
      const errorCode = error?.response.status

      handleErrorEvent(errorCode)
      console.error(error, 'error')
    }
  }

  const getContainerHeight = () => {
    const boundValue = containerRef?.current?.getBoundingClientRect()

    setContainerHeight(boundValue?.top)
  }

  useEffect(() => {
    getContainerHeight()
  }, [receiverList])

  return (
    <FileUploadContainer ref={containerRef}>
      {apiStatus && apiStatus === 'loading' && (
        <DataFetchLoadingWrapper>
          <DataFetchLoading containerHeight={containerHeight} />
        </DataFetchLoadingWrapper>
      )}

      <FileUploadWrapper>
        <FileUploadHeader>
          <NumberOfUser>
            총 <Bold>{receiverList.length}</Bold>명
          </NumberOfUser>

          {receiverList.length && apiStatus === 'success' ? (
            <PostButton onClick={() => postGoogleSheet()}>
              <Image
                src='/svg/icon/download_upload_icon.svg'
                width={12}
                height={12}
                alt='file_upload_icon'
              />
              배송 시트로 업로드
            </PostButton>
          ) : (
            <></>
          )}
        </FileUploadHeader>

        {receiverList.length ? (
          <TableWrapper>
            <TableHead>
              <TableSectionLine $section='header'>
                <TableSection $field='number'> </TableSection>
                <TableSection>품목</TableSection>
                <TableSection>받는분</TableSection>
                <TableSection>전화번호</TableSection>
                <TableSection $field='address'>주소</TableSection>
                <TableSection>예약상태</TableSection>
                <TableSection $field='billNumber'>운송장번호</TableSection>
                <TableSection>집화예정점소</TableSection>
                <TableSection>접수일자</TableSection>
                <TableSection>집화예정일자</TableSection>
                <TableSection>집화일자</TableSection>
                <TableSection>예약구분</TableSection>
                <TableSection $field='billNumber'>예약번호</TableSection>
                <TableSection>발송고객코드</TableSection>
                <TableSection>발송고객명</TableSection>
                <TableSection>보내는고객</TableSection>
                <TableSection>전화번호</TableSection>
                <TableSection $field='address'>주소</TableSection>
                <TableSection>수량</TableSection>
                <TableSection>접수번호</TableSection>
                <TableSection>예약매체</TableSection>
              </TableSectionLine>
            </TableHead>

            <TableBody>
              {receiverList?.map((receiver: receiverInfomation) => (
                <ShippingDataLine
                  key={receiver.billNumber}
                  receiver={receiver}
                  getDetailStatus={getDetailStatus}
                  TableConfig={TableConfig}
                  TableSectionLine={TableSectionLine}
                  TableSection={TableSection}
                />
              ))}
            </TableBody>
          </TableWrapper>
        ) : (
          <EmptyShippingList />
        )}
      </FileUploadWrapper>
    </FileUploadContainer>
  )
}

export default ShippingList
