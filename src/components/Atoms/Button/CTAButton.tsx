import React from 'react'

import styled from 'styled-components'

import { handleToast } from '@/utils/toast/handleToast'

const Button = styled.button`
  width: 100%;
  padding: 14px 0px;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;
  line-height: 100%;
  color: ${(props) => (props.$isActive ? 'white' : '#495057')};
  background-color: ${(props) => (props.$isActive ? '#96f' : '#f8f9fa')};
  cursor: ${(props) => (props.$isActive ? 'pointer' : 'default')};
`

const CTAButton = ({ buttonText, isActive, clickEvent, errorMessage }: any) => {
  const checkLoginInfomation = () => {
    if (!isActive) {
      handleToast('error', errorMessage)
    } else {
      clickEvent()
    }
  }

  return (
    <Button $isActive={isActive} onClick={() => checkLoginInfomation()}>
      {buttonText}
    </Button>
  )
}

export default CTAButton
