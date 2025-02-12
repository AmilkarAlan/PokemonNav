
import { useDispatch, useSelector } from 'react-redux'
import LoadingLayout from './LoadingLayout'
import ViewLayout from './ViewLayout'
import { useEffect } from 'react'
import { fetchPokeData } from '../store/pokemonSlice'



const PokeView = () => {
  const { pokemon, loading } = useSelector((state: any) => state.pokemon)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemon) {
      dispatch(fetchPokeData(1));
    }
  }, [pokemon]);

  return (
    <section className='w-full h-full flex justify-center'>
      {loading | !pokemon ? <LoadingLayout /> : <ViewLayout />}
    </section>

  )
}

export default PokeView