import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import styled from 'styled-components'

const LoadingContainer = styled.div`
  position: relative;
  height: 100%;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
`

const Loadingwrapper = styled.div`
  position: absolute;
  top: ${(props) => props.$containerHeight}px;
  left: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
`

const LoadingImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
  border-radius: 200px;
  line-height: 130%;
`

const DataFetchLoading = ({ containerHeight }: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [imgSrcList] = useState<string[]>([
    '/svg/characters/character-posing-1.svg',
    '/svg/characters/character-posing-2.svg',
    '/svg/characters/character-posing-3.svg',
  ])

  useEffect(() => {
    const rollingIndex = setInterval(() => {
      setCurrentIndex((prevIndex: number) => {
        const nextIndex = (prevIndex + 1) % imgSrcList.length

        return nextIndex
      })
    }, 1000)

    return () => {
      clearInterval(rollingIndex)
    }
  }, [])

  return (
    <LoadingContainer>
      <Loadingwrapper $containerHeight={containerHeight}>
        <LoadingImageBox>
          <Image
            src={imgSrcList[currentIndex]}
            width={170}
            height={170}
            alt='loading_image'
          />

          <LoadingText>최신 데이터를 불러오고 있어요</LoadingText>
        </LoadingImageBox>
      </Loadingwrapper>
    </LoadingContainer>
  )
}

export default DataFetchLoading
