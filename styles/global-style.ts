import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    font-size: 16px;
    font-face: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
    'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    sans-serif;
  }

  body {
    display: block;
    width: 100%;
    height: 100%;
    background: ${({ theme }: { theme: any }) => theme.bgColor};
    color: ${({ theme }: { theme: any }) => theme.textColor};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  button { 
    border: none;
    outline: none;
    color: ${({ theme }: { theme: any }) => theme.bgColor};
    background-color: ${({ theme }: { theme: any }) => theme.textColor};
}
  `
