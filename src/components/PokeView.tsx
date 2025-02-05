
import { useSelector } from 'react-redux'
import LoadingLayout from './LoadingLayout'
import ViewLayout from './ViewLayout'



const PokeView = () => {
  const { pokemon, loading } = useSelector((state: any) => state.pokemon)
  return (
    <section className='w-1/2 h-full bg-amber-100 flex flex-col m-8 rounded-xl overflow-hidden'>
{loading | pokemon === null ? <LoadingLayout /> : <ViewLayout/> }
      
    </section>

  )
}

export default PokeView