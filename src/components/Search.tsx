import { useState } from "react"
import { useDispatch } from "react-redux";
import { fetchPokeData } from "../store/pokemonSlice";



const Search = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const search = (e) => {
        e.preventDefault();
        if (input !== "") {
            dispatch(fetchPokeData(input))
            setInput("")
        }
    }
    return (
        <section className="h-full w-full col-span-2 overflow-hidden flex items-center justify-center rounded-xl border-4 border-gray-500 bg-white">
            <form className="w-full flex gap-2 items-center justify-center  py-1.5 px-2.5" onSubmit={(e) => search(e)}>
                <label htmlFor="search">Buscador</label>
                <div className="border border-slate-500/25 rounded-xl py-2 transition-all duration-400 focus-within:border-slate-600">
                    <input className="h-fit outline-none" type="text" name='search' placeholder='Ejemplo: Pikachu ó 25' onChange={(e) => setInput(e.target.value)} value={input} />
                    <button type='submit'>Buscar</button>
                </div>
            </form>
        </section>
    )
}

export default Search