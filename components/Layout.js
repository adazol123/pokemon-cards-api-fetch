import Head from 'next/head'
import { Box, Flex, Button, useColorMode, useColorModeValue, Heading } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'


export default function Layout({ title, children }) {
    const { colorMode, toggleColorMode } = useColorMode()
    const formBackground = useColorModeValue('gray.100','gray.700')
    const containerBackground = useColorModeValue('gray.200','gray.800')

    return (
        <Flex minHeight='100vh' justifyContent='center' direction='column' bg={ containerBackground }
  
        >
            <Head>
                <title> Adazolhub | { title }</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex 
                w='full' 
                px={6} 
                py={3} 
                justifyContent='space-between' 
                alignItems='center' 
                background={ formBackground } 
                borderBottom='azure'

            >

                <Heading fontSize='medium' fontWeight={400} textDecoration='linen' textTransform='capitalize'> adazolhub  |  { title }</Heading>
                <Button onClick={ toggleColorMode } variant='outline' rounded='full' bg='blackAlpha.400'>
                    {colorMode === 'dark' ? <MoonIcon/> : <SunIcon/>}
                </Button>
            </Flex>
            <Flex flex={1} justifyContent='center' alignItems='center' direction='column'>
                {children}
            </Flex>
        </Flex>
    )
}
