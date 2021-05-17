import Layout from "../components/Layout"
import NextLink from 'next/link'
import { Heading, Text, Button, Flex, Stack, HStack, Tag, Image } from "@chakra-ui/react"
import NextImage from "next/image"
import { ChevronLeftIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

export default function pokemon( {pokeman }) {
    console.log(pokeman)
    const { query: { index },} = useRouter()
    return (
        <Layout title={ pokeman.name} >
            <Flex my={2} px={2} justifyContent='flex-start' w='100vw' alignItems='center'>
                <NextLink href='/'>
                    <a>
                    <Button>
                        <ChevronLeftIcon mr={2} w={8} h={8}/>
                       Back
                    </Button>
                    </a>
                </NextLink>
            </Flex>
            <Flex flex={1} flexDirection='column' alignItems='center' justifyContent='center'>
                <motion.img src={pokeman.image} alt={pokeman.name} width={300} height={300} quality={20} priority
                    layoutId={pokeman.name}
                    whileTap={{ scale: 0.8 }}
                    />
                <Heading mb={2} fontSize='4xl' textTransform='capitalize'> { pokeman.name }</Heading>
                <hr />
                <Text mt={8}><span>Weight: </span> {pokeman.weight}</Text>
                <Text><span>Height: </span> {pokeman.height}</Text>
                <Heading my={2}>Types</Heading> 
                <HStack my={3} spacing={3}>
                    { pokeman.types.map((type, index) => (

                            <Tag key={index}
                                size="lg" colorScheme='green' borderRadius="full" textTransform='capitalize'
                                px={4}
                            >{type.type.name}</Tag>
                    ))}
                </HStack>
            </Flex>

        </Layout>
    )
}


export async function getServerSideProps({ query }) {
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeman = await res.json()
        const paddedIndex = ('00' + (id)).slice(-3)
        const image =`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokeman.image = image

        return {
            props: { pokeman }
        }

    } catch (err) {
        console.error(err);
    }
}