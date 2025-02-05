import { useDispatch } from 'react-redux';
import './App.css'
import { fetchPokeData } from './store/pokemonSlice';

function App() {
  const dispatch = useDispatch();


  return (
    <>
      <button onClick={() => dispatch(fetchPokeData(2))}>Click</button>
    </>
  )
}

export default App
