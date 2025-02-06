
import { useSelector } from 'react-redux'
import LoadingLayout from './LoadingLayout'
import ViewLayout from './ViewLayout'



const PokeView = () => {
  const { pokemon, loading } = useSelector((state: any) => state.pokemon)
  return (
    <section className='w-fit h-full flex flex-col my-4 rounded-xl overflow-hidden lg:w-2/3'>
      {loading | pokemon === null ? <LoadingLayout /> : <ViewLayout />}

    </section>

  )
}

export default PokeView