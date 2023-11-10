import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

import styled from 'styled-components'
import { mediaQuery, BREAKPOINT_TABLET } from '../../../../../styles/mediaQuery'

const ModalContainer = styled.div`
  pointer-events: visiblefill;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 700px;
  height: 700px;
  padding: 24px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  overflow: hidden;
  background-color: #fff;
  z-index: 3000;

  ${mediaQuery(BREAKPOINT_TABLET)} {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.6px;
  line-height: 130%;
  color: #212529;
`

const CancelButtonBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const DetailFrameWrapper = styled.div`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  width: 100%;
  animation: fadein 7s;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
`

const ShippingDetailModal = ({
  isDetailModalOn,
  setIsDetailModalOn,
  detailShipNumber,
}: any) => {
  const modalWrapperRef = useRef<HTMLDivElement>(null)

  const clickModalContainer = (e: React.MouseEventHandler) => {
    if (isDetailModalOn && !modalWrapperRef.current?.contains(e.target)) {
      setIsDetailModalOn(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', (e) => clickModalContainer(e))

    return () => {
      document.addEventListener('mousedown', (e) => clickModalContainer(e))
    }
  })

  return (
    <ModalContainer ref={modalWrapperRef}>
      <ModalWrapper>
        <ModalHeader>
          <Title>배송 상세 보기</Title>
          <CancelButtonBox onClick={() => setIsDetailModalOn(false)}>
            <Image
              src='/svg/icon/close.svg'
              width={20}
              height={20}
              alt='cancel_button'
            />
          </CancelButtonBox>
        </ModalHeader>

        <DetailFrameWrapper>
          <Iframe src={detailShipNumber} />
        </DetailFrameWrapper>
      </ModalWrapper>
    </ModalContainer>
  )
}

export default ShippingDetailModal
