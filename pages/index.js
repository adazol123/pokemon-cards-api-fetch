import Head from 'next/head'
import NextImage from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Box, Flex, Heading, useColorMode, useColorModeValue, Image, Text, Grid, GridItem, List, UnorderedList, ListItem } from '@chakra-ui/react'
import Layout from '../components/Layout'
import NextLink from 'next/link'
import { motion } from 'framer-motion'


export default function Home({ pokemon }) {
  // console.log(pokemon)
  return (
    <Layout title='Home'>
          <Heading fontSize='4xl' m={8}>Cards</Heading>
            <Grid  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', '2xl': 'repeat(5, 1fr)'}} gap={6} p={10}>
              {pokemon.map((pokeman, index) => (
                  <NextLink key={index} href={`/pokemon?id=${index +1}`}>
                      <a className={styles.tags}>
                        <Box
                          boxShadow="base"
                          cursor='pointer'
                          _hover={{
                            background: 'blackAlpha.100',
                            color: "teal.400",
                            fontWeight:'semibold',
                            boxShadow:"lg",
                            varient: 'smooth'
                          }}
                          // w="100%"
                          // h={300}
                          // border='lightsteelblue solid 1px' 
                          // boxSize={300} 
                          borderRadius={30} 
                          userSelect='none'
                          p={8} >
                            <motion.img src={pokeman.image} alt={pokeman.name} width={200} height={200} priority quality={20} 
                              layoutId={pokeman.name}
                              animate={{ scale: 0.9 }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 1.0 }}
                              whileFocus={{scale : 1.4}}
                              />
                            {/* <span>{ index + 1 } </span> */}
                            <Text fontSize="md" >
                            { pokeman.name }
                            </Text> 
                        </Box>
                      </a>
                                        
                  </NextLink>
                
              ))}
            </Grid>
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
