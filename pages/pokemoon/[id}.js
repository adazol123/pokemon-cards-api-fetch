import { useRouter } from 'next/router'

const Pokemoon = () => {
    const { isFallback } = useRouter();
    return ( 
        <>
        {isFallback? <h1>Loading</h1> :       <div>
            Hello
        </div>
        }
        </>
     );
}


 
export default Pokemoon;
