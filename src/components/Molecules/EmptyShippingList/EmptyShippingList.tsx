import React from 'react'
import Image from 'next/image'

import styled from 'styled-components'

const EmptyWrapper = styled.div``

const EmptyContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`

const EmptyContentsBox = styled.div``

const EmptyContentsText = styled.div`
  margin-top: 24px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.4px;
  line-height: 130%;
  color: #adb5bd;
`

const EmptyShippingList = () => {
  return (
    <EmptyWrapper>
      <EmptyContentsWrapper>
        <EmptyContentsBox>
          <Image
            src='/svg/characters/empty_contents.svg'
            width={100}
            height={100}
            alt='empty_contents'
          />
        </EmptyContentsBox>

        <EmptyContentsText>
          등록된 파일이 없어요. 파일을 업로드 해주세요.
        </EmptyContentsText>
      </EmptyContentsWrapper>
    </EmptyWrapper>
  )
}

export default EmptyShippingList
