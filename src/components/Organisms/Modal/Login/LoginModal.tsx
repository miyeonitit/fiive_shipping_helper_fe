import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

import styled from 'styled-components'
import { mediaQuery, BREAKPOINT_TABLET } from '../../../../../styles/mediaQuery'

import AxiosHandler from '../../../../api/AxiosHandler'

import LoginInput from '@/components/Atoms/Input/LoginInput'
import CTAButton from '@/components/Atoms/Button/CTAButton'

const ModalContainer = styled.div`
  pointer-events: visiblefill;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  height: 432px;
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
  margin: 28px 0px;
`

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const ModalFooter = styled.div`
  width: 100%;
`

const IdBox = styled.div`
  width: 100%;
  margin-bottom: 24px;
`

const PasswordBox = styled.div`
  width: 100%;
`

const Label = styled.div`
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.4px;
  line-height: 135%;
  color: #343a40;
`

const LoginModal = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const modalWrapperRef = useRef<HTMLDivElement>(null)

  const emailRegPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  const passwordValue = process.env.NEXT_PUBLIC_PASSWORD_VALUE

  const requestLogin = async () => {
    try {
      const body = {
        email: email,
        password: password,
      }

      const responseData = await AxiosHandler.post(`/auth/login`, body)

      console.log(responseData, 'responseData')
    } catch (error) {
      console.error(error)
    }
  }

  // 스크롤, 클릭, 드래그 비활성화
  useEffect(() => {
    console.log(document.body.style, 'document.body.style')
    document.body.style.overflow = 'hidden'
    document.body.style.userSelect = 'none'
    document.body.style.pointerEvents = 'none'
  }, [])

  return (
    <ModalContainer ref={modalWrapperRef}>
      <ModalWrapper>
        <ModalContents>
          <ModalHeader>
            <Image
              src='/svg/logo/fiive_logo.svg'
              alt='fiive_logo'
              width={90}
              height={45}
            />
          </ModalHeader>

          <IdBox>
            <Label>이메일</Label>
            <LoginInput
              type='email'
              placeholder='이메일 입력'
              maxLength={18}
              value={email}
              setValueState={setEmail}
              isActive={email.length > 0}
              isError={!emailRegPattern.test(email)}
            />
          </IdBox>

          <PasswordBox>
            <Label>비밀번호</Label>
            <LoginInput
              type='password'
              placeholder='비밀번호 입력'
              maxLength={14}
              value={password}
              setValueState={setPassword}
              isActive={password.length > 0}
              isError={password !== passwordValue}
            />
          </PasswordBox>
        </ModalContents>

        <ModalFooter>
          <CTAButton
            buttonText='로그인'
            isActive={emailRegPattern.test(email) && password === passwordValue}
            clickEvent={requestLogin}
            errorMessage='아이디와 비밀번호를 확인해 주세요.'
          />
        </ModalFooter>
      </ModalWrapper>
    </ModalContainer>
  )
}

export default LoginModal
