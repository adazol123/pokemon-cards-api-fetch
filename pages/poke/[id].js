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
            revalidation: 10,
        }

    } catch (err) {
        console.error(err);
    }
}

export async function getStaticPaths({ query }) {
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeman = await res.json()
        const paddedIndex = ('00' + (id)).slice(-3)
        const image =`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokeman.image = image
        const paths = pokeman.map((m))

        return {
            props: { pokeman }
        }

    } catch (err) {
        console.error(err);
    }
}