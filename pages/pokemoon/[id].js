import { useRouter } from 'next/router'
import Layout from "../../components/Layout"
import NextLink from 'next/link'
import { Heading, Text, Button, Flex, Stack, HStack, Tag, Image, Img, Grid } from "@chakra-ui/react"
import NextImage from "next/image"
import { ChevronLeftIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { motion } from "framer-motion"

const Pokemoon = ({ pokeman }) => {
    const { image, name, weight, height, types, species: { name: speciesName}, abilities, moves } = pokeman //basic destructure
    // console.log(pokeman)
    // console.log(speciesName)
    // const { ability: { name: abiName} } = one
    // const { ability: { name: abiName2} } = two
    // console.log(abiName, abiName2)

    // for (const { ability: { url: abilityName } } of abilities)
    //     console.log(abilityName)
    //forEach loop
    // let abilName = ''
    // abilities.forEach(function( abilitys ) {
    //     const { ability: {name: abiName, url} } = abilitys
    //     abilName = abiName
    // })
    // const ids = query.id
    // console.log(pokeman)
    // const { isFallback } = useRouter()
    const router = useRouter()

    const varients = {
        hidden: { opacity: 0},
        visible: { opacity: 1}
    
    }

    return (
        <>
        {
        <Layout title={ name} >
            <Flex as={motion.div} my={2} px={2} justifyContent='flex-start' w='100vw' alignItems='center'
                exit='initial'
                initial='exit'
                animate='animate'
            >
                <NextLink href='/' scroll={false}>
                    <a>
                    <Button>
                        <ChevronLeftIcon mr={2} w={8} h={8}/>
                       Back
                    </Button>
                    </a>
                </NextLink>
            </Flex>
            <Flex flex={1} flexDirection='column' alignItems='center' justifyContent='center' px={6}>
                <Img as={motion.img } src={image} alt={name} width={300} height={300} quality={2}
                    layoutId={pokeman.image}
                    variants={varients}
                    transition={{ delay: 0.2}}
                    whileTap={{ scale: 0.8 }}
                    />
                <Heading as={motion.h1} mb={2} fontSize='4xl' textTransform='capitalize' color="teal.400"
                    variants={varients}
                    transition={{ delay: 0.2}}
                    > { name }</Heading>
                <hr />
                <br />
                
                <Flex flexDirection='column' width='full'>
                    <Heading mt={10}  fontSize='xl' >Status</Heading> 
                    <Text px={4} mt={3}><span>Weight: </span> {weight} G</Text>
                    <Text px={4} ><span>Height: </span> {height} CM</Text>
                </Flex>
                <Flex flexDirection='column' width='full'>
                 <Heading mt={18} color='blue.400'  fontSize='xl' >Ability</Heading> 
                    <HStack my={3} spacing={3}>
                        {abilities.map(( mainAbility ) => (
                            // const { ability: {name: abiName}} = mainAbility;
                            <Tag key={mainAbility.ability.name}
                            size="lg" colorScheme='facebook' borderRadius="full" textTransform='capitalize'
                            px={4}
                            >{mainAbility.ability.name}</Tag>
                           
                        ))}
                    </HStack>

                    <Heading mt={18}  color='green.400'  fontSize='xl' >Types</Heading> 
                    <HStack my={3} spacing={3}>
                        {types.map((type, index) => (

                                <Tag key={index}
                                    size="lg" colorScheme='green' borderRadius="full" textTransform='capitalize'
                                    px={4}
                                >{type.type.name}</Tag>
                        ))}
                    </HStack>
                    <Heading mt={18} color='purple.400' fontSize='xl' >Special Moves</Heading> 
                    <Flex justifyContent='normal' w='auto' flexWrap='wrap' px={2} m={6}>
                        {moves.map(( specialMoves) => (
                           <Tag key={specialMoves.move.name}
                           size='sm' colorScheme='purple' px={3} height={8} w='fit-content' borderRadius="full" textTransform='capitalize'
                           fontSize={12}
                           m={2}
                           >{specialMoves.move.name}</Tag>
                        ))}
                    </Flex>
                                
                </Flex>
            </Flex>

        </Layout> }
        </>
    )
}

export async function getStaticPaths() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=80')
        const { results } = await res.json()
        const paths = results.map((_, index) => {
          const _id = (index + 1).toString()
          return {
            params: { id: _id },
          }
          
        })
        return {
          paths ,
         fallback: false,
          
        }
      } catch (err) {
        console.error(err);
      }
}
 

export async function getStaticProps({ params }) {
    const id = params.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeman = await res.json()
        const paddedIndex = ('00' + (id)).slice(-3)
        const image =`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokeman.image = image
        return {
            props: { pokeman },
            revalidate: 1000,
        }

    } catch (err) {
        console.error(err);
    }
}


export default Pokemoon;
