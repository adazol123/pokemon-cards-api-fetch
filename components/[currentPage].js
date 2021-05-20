// import { async } from 'regenerator-runtime';
// import Index, { getStaticProps } from './'

// export default Index;
// export { getStaticProps }

// export const getStaticPaths = async () => {
//     const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=80')
//     const { results } = await res.json()
//     const numberOfpages = Math.ceil(results / 5.0)
//     const paths = Array( numberOfpages -1).fill(' ').map((_, index) => {
//         return { params: { currentPage: ( index + 1).toString()}}
//     })
//     return {
//         fallback: false,
//         paths: paths
//     }
// }