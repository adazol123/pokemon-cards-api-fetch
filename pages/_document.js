import Document, { Html, Head, Main, NextScript } from 'next/document'
import { async } from 'regenerator-runtime';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
          <Html lang="en">
            <Head>
              {/* PWA primary color */}
              {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
              <link rel="preconnect" href="https://fonts.gstatic.com"></link>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700&display=swap"
              />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
}

// MyDocument.getInitialProps = async ctx => {
//     const orignalRenderPage = ctx.renderPage;
//     ctx.renderPage = () =>
//     orignalRenderPage({
//         enhanceApp: App => props => (<App {...props} />)
//     })

//     const initialProps = await Document.getInitialProps(ctx);
//     return initialProps
//     //{
//     //     ...initialProps,
//     //     // Styles fragment is rendered after the app and page rendering finish.
//     //     // styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
//     //   };
// }