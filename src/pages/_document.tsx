import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getIntialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head lang='ko'>
          <meta charSet='utf-8' />

          <link rel='icon' href='/icons/studio_favicon_black.ico' />

          <meta name='description' content='fiive 배송 대시보드' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />

          <meta property='og:type' content='website' />
          <meta property='og:title' content='fiive 배송 대시보드' />
          <meta property='og:site_name' content='fiive 배송 대시보드' />
          <meta property='og:description' content='fiive 배송 대시보드' />

          <meta name='twitter:title' content='fiive 배송 대시보드' />
          <meta name='twitter:description' content='fiive 배송 대시보드' />
        </Head>

        <body className='root'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
