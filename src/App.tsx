
import './App.css'
import PokeView from './components/PokeView'
import Search from './components/Search'


function App() {


  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center'>
      <Search />
      <PokeView />
    </main>
  )
}

export default App
