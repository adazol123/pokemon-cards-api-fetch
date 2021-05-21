import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimateSharedLayout, AnimatePresense } from 'framer-motion'


function MyApp({ Component, pageProps }) {

    return (
        
        <AnimateSharedLayout type="crossfade">
      <ChakraProvider>
          <Component {...pageProps} />
      </ChakraProvider>

        </AnimateSharedLayout>
    )


}

export default MyApp
