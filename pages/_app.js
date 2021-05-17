import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimateSharedLayout } from 'framer-motion'


function MyApp({ Component, pageProps }) {

    return (
      <ChakraProvider>
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </ChakraProvider>
    )


}

export default MyApp
