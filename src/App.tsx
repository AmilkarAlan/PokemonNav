
import './App.css'
import PokeView from './components/PokeView'
import Search from './components/Search'


function App() {


  return (
    <main className='min-h-full  flex flex-col items-center justify-center overflow-auto px-4 py-5'>
      <Search />
      <PokeView />
    </main>
  )
}

export default App
