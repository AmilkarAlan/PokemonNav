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
        }
    }
    return (
        <section className="h-fit w-1/2 mt-5 bg-amber-100 rounded-xl p-4">
        <form className="flex" onSubmit={(e)=>search(e)}>
            <label htmlFor="search">Ingresa el nombre o el id del Pokemon</label>
            <input className="border border-slate-500/25 rounded-xl" type="text" name='search' placeholder='Ejemplo: Pikachu ó 25' onChange={(e) => setInput(e.target.value)} value={input} />
            <button type='submit'>Buscar</button>
        </form>
        </section>
    )
}

export default Search