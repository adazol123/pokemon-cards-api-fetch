import Layout from "../components/Layout"
import NextLink from 'next/link'
import { Heading, Text, Button, Flex, Stack, HStack, Tag, Image, Img } from "@chakra-ui/react"
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
                <Image as={motion.img } srcSet={pokeman.image} alt={pokeman.name} width={300} height={300} quality={20} priority
                    layoutId={pokeman.image}
                    whileTap={{ scale: 0.8 }}
                    transition={spring} 
                    />
                <Heading as={motion.h1} mb={2} fontSize='4xl' textTransform='capitalize' color="teal.400"
                    layoutId={pokeman.name}> { pokeman.name }</Heading>
                <hr />
                <Flex flexDirection='column' width='full'>
                    <Heading mt={10}  fontSize='2xl' >Status</Heading> 
                    <Text px={4} mt={3}><span>Weight: </span> {pokeman.weight} KG</Text>
                    <Text px={4} ><span>Height: </span> {pokeman.height} CM</Text>
                </Flex>
                <Flex flexDirection='column' width='full'>

                    <Heading mt={15}  fontSize='2xl' >Types</Heading> 
                    <HStack my={3} spacing={3}>
                        { pokeman.types.map((type, index) => (

                                <Tag key={index}
                                    size="lg" colorScheme='green' borderRadius="full" textTransform='capitalize'
                                    px={4}
                                >{type.type.name}</Tag>
                        ))}
                    </HStack>
                                
                </Flex>
            </Flex>

        </Layout>
    )
}
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };


export async function getStaticProps({ query }) {
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