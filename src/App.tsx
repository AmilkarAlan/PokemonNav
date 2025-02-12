
import './App.css'
import PokeView from './components/PokeView'
import Search from './components/Search'


function App() {


  return (
    <main className='h-screen flex flex-col items-center overflow-auto px-4'>
      <Search />
      <PokeView />
    </main>
  )
}

export default App
