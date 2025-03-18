
import { useEffect } from 'react';
import './App.css'
import Layout from './components/Layout'
import PokeView from './components/PokeLayout'
import Search from './components/Search'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokeData } from './store/pokemonSlice';


function App() {
  const { pokemon } = useSelector(state => state.pokemon)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemon) {
      dispatch(fetchPokeData(1));
    }
  }, [pokemon]);

  return (
    <main className='h-screen flex flex-col bg-gray-700 flex-wrap overflow-auto p-5 gap-2.5 relative'>
      <Layout />
    </main>
  )
}

export default App
