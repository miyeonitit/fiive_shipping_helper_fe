import React from 'react'
import Image from 'next/image'

import styled from 'styled-components'

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0px 24px;
  border-bottom: 1px solid #f1f3f5;
`

const HeaderWrapper = styled.div`
  display: flex;
`

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
`

const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 100%;
  color: #212529;
`

const Body = styled.div`
  height: calc(
    100vh - (${(props) => props.$headerHeight + props.$footerHeight}px)
  );
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 0px 24px;
  border-top: 1px solid #f1f3f5;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.4px;
  line-height: 135%;
  color: #adb5bd;
  background-color: white;
`

const Layout = (props: any) => {
  const { children } = props

  const goToFiive = process.env.NEXT_PUBLIC_FIIVE_URL

  return (
    <TemplateWrapper>
      <Header>
        <HeaderWrapper>
          <ImageBox>
            <Image
              src='/svg/logo/fiive_logo.svg'
              alt='fiive_logo'
              width={60}
              height={35}
              onClick={() => (window.location.href = goToFiive)}
            />
          </ImageBox>
          <HeaderTitle>배송 대시보드</HeaderTitle>
        </HeaderWrapper>
      </Header>

      <Body $headerHeight={72} $footerHeight={65}>
        {children}
      </Body>

      <Footer>
        Copyright © 2024 PURE BLACK inc, ltd. All rights reserved.
      </Footer>
    </TemplateWrapper>
  )
}

export default Layout
