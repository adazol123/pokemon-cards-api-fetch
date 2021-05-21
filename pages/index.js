import Head from 'next/head'
import NextImage from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Box, Flex, Heading, useColorMode, useColorModeValue, Image, Text, Grid, GridItem, List, UnorderedList, ListItem, Img } from '@chakra-ui/react'
import Layout from '../components/Layout'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import  { useRouter } from 'next/router'



function Home({ pokemon } ) {

  // const { isFallback } = useRouter();
  // const [{ id }] = pokemon
  
  // console.log(pokemon)
  // console.log(id)
  const variants = {
    hidden: { opacity: 0},
    visible: { opacity: 1}
  }
  const easing = [0.6,-0.05,0.01,0.99]
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing 
      }
    }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <motion.div className='main_div'
      exit='initial'
      initial='exit'
      animate='animate'
    >
  
    <Layout title='Home'>
          <Heading fontSize='4xl' m={8}>Cards</Heading>
            <Grid className='content_div_01' as={motion.div}  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', '2xl': 'repeat(5, 1fr)'}} gap={4} p={10} variants={stagger}>
              {pokemon.map((pokeman) => (
                  <NextLink key={pokeman.id} href={`/pokemoon/${pokeman.id}`}>
                      
                        <Flex as={motion.div}
                          className='cards'
                          variants={fadeInUp}
                          whileHover={{ scale: 1.05}}
                          whileTap={{ scale: 0.9 }}
                          boxShadow="base"
                          cursor='pointer'
                          _hover={{
                            background: 'blackAlpha.300',
                            color: "green.400",
                            fontWeight:'semibold',
                            boxShadow:"lg",
                            varient: 'smooth'
                          }}
                          _active={{
                            background: 'blackAlpha.100',
                            color: "teal.400",
                            fontWeight:'semibold',
                            boxShadow:"lg",
                            varient: 'smooth'
                          }}
                          _focus={{
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
                            <a className={styles.tags}>
                            <Img as={motion.img}  src={pokeman.image} alt={pokeman.name} width={200} height={200} quality={1} 
                              layoutId={pokeman.image}
                              variants={fadeInUp}
                              transition={{ delay: 0.2}}
                              // initial={{ x: 200, opacity: 0}}
                              // animate={{ x: 0, opacity: 1}}
                              // transition={{ delay: 0.2 }}
                              />
                            {/* <span>{ index + 1 } </span> */}
                            <Heading as={motion.h1} fontSize="md" 
                                                variants={fadeInUp}
                             >
                            { pokeman.name }
                            </Heading> 
                            </a>
                        </Flex>

                                        
                  </NextLink>
                
              ))}
            </Grid>
    </Layout>
    
    </motion.div>
  )
}



export async function getStaticProps( )  {

  // const currentPage = ctx.params?.currentPage
  // const currentPageNumber = +(currentPage || 0)
  // const min = currentPageNumber * 5
  // const max = (currentPageNumber + 1) * 5

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=80')
    const { results } = await res.json()
    const pokemon = results.map((result, index) => {
      const paddedIndex = ('00' + ( index + 1)).slice(-3)
      const image =`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      const id = (index + 1).toString()
      return { id,
        ...result, 
        image, 
      }
      
    })
    return {
      props: { pokemon } ,
      revalidate: 1000
      
    }
  } catch (err) {
    console.error(err);
  }

}




export default Home
