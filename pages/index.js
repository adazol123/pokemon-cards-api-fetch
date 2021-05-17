import Head from 'next/head'
import NextImage from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Box, Flex, Heading, useColorMode, useColorModeValue, Image, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'
import NextLink from 'next/link'


export default function Home({ pokemon }) {
  return (
    <Layout title='Home'>
          <Heading fontSize='4xl' m={8}>Cards</Heading>
          <Box>
            <ul >
              {pokemon.map((pokeman, index) => (
                <li key={index}>
                  <NextLink href={`/pokemon?id=${index +1}`}>
                    <Box 
                      border='lightsteelblue solid 1px' 
                      boxSize={300} 
                      borderRadius={30} 
                      p={8}  
                      m={6} 
                      display="grid"
                      flexDirection="column"
                      justifyContent="flex-end"
                      alignItems='center'>
                      <a className={styles.tags}>
                        <NextImage src={pokeman.image} alt={pokeman.name} width={300} height={300} priority/>
                        {/* <span>{ index + 1 } </span> */}
                        <Text fontSize="md">
                         { pokeman.name }
                        </Text> 
                      </a>
                                        
                    </Box>
                  </NextLink>
                </li>
                
              ))}
            </ul>
          </Box>
    </Layout>
  )
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()
    const pokemon = results.map((result, index) => {
      const paddedIndex = ('00' + ( index + 1)).slice(-3)
      const image =`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image
      }
    })
    return {
      props: { pokemon }
    }

  } catch (err) {
    console.error(err);
  }

}
