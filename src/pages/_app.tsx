import Head from 'next/head'

import { RecoilRoot } from 'recoil'

import { ThemeProvider } from 'styled-components'
import { theme } from '../../styles/theme'
import { GlobalStyle } from '../../styles/global-style'

import type { AppPropsWithLayout } from '../../types/Layout/AppPropsWithLayout'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <title>fiive 배송 대시보드</title>
      </Head>

      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
