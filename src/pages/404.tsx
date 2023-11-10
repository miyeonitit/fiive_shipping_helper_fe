import React, { ReactElement } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import Layout from '@/components/Layout'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${(props) => props.$height}px);
  padding: 0px 24px;
`

const NotFoundBox = styled.div`
  height: 100%;
  margin-top: 80px;
  text-align: center;
  margin-bottom: 40px;
`

const IconBox = styled.div`
  margin-bottom: 40px;
`

const TitleText = styled.div`
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.6px;
  line-height: 130%;
  text-align: center;
  color: #212529;
`

const SubText = styled.div`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.4px;
  line-height: 130%;
  text-align: center;
  color: #212529;
`

const ButtonBox = styled.div`
  margin-top: 40px;
`

const Button = styled.button`
  width: 146px;
  padding: 16px 0;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;
  line-height: 100%;
  color: ${(props) => (props.$button === 'home' ? '#fff' : '#495057')};
  background-color: ${(props) =>
    props.$button === 'home' ? '#96f' : '#f8f9fa'};
  cursor: pointer;
`

const not_found = () => {
  const router = useRouter()

  return (
    <NotFoundContainer $height={65}>
      <NotFoundBox>
        <IconBox>
          <Image
            src='/svg/characters/404_character.svg'
            width={150}
            height={150}
            alt='not_found_icon'
          />
        </IconBox>

        <TitleText>페이지를 찾을 수 없어요!</TitleText>
        <SubText>
          페이지가 사라졌거나 주소가 변경됐을 수 있어요. <br />
          이전 페이지로 이동 또는 페이지 주소를 다시 확인해 주세요.
        </SubText>

        <ButtonBox>
          <Button onClick={() => router.back()}>이전으로</Button>
          <Button $button='home' onClick={() => router.push('/')}>
            홈으로
          </Button>
        </ButtonBox>
      </NotFoundBox>
    </NotFoundContainer>
  )
}

not_found.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
export default not_found
