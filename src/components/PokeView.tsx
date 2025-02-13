import { useSelector } from "react-redux"
import ButtonsPad from "./ButtonsPad";
import NavInView from "./NavInView";

const PokeView = () => {
    const { pokemon } = useSelector((state: any) => state.pokemon)
    return (
        <div className='w-full h-full grid grid-flow-row rounded-xl z-10 overflow-hidden relative' >
            <ButtonsPad id={pokemon.id} />
            <div className='w-full h-full flex flex-col z-30' style={{ animation: "inObject 1s linear" }}>
                <div className='flex flex-col' >
                    {/* {pokemon.isEvolution ? (
                            <div>
                            <p className="text-lg text-gray-600 font-light self-end">Evolución previa:</p>
                            <p className="text-xl text-gray-600 font-light self-end">{pokemon.evolves_from.name.charAt(0).toUpperCase() + pokemon.evolves_from.name.slice(1)}</p>
                            </div>
                            ) : null} */}
                    <div className="self-center">
                        <img className="w-full h-48 object-cover" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt={pokemon.name} loading="lazy" />
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2 p-4'>
                    <div className='flex flex-col items-center'>
                        <p className="text-lg text-gray-600 font-extralight"><span className="mr-0.5">#</span>{pokemon.id.toString().padStart(4, "0")}</p>
                        <p className="text-2xl font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        <p className="text-lg text-gray-700 font-thin">{pokemon.genera.text}</p>
                    </div>
                </div>
                <div className='w-full flex justify-center gap-4'>
                    {pokemon.types.map((ty: string, i: number) => (
                        <div className='w-fit h-fit flex items-center gap-2 bg-slate-500 rounded-r-md rounded-l-3xl shadow-md shadow-black mb-4' key={i}>
                            <img className="w-5" src={ty.icon} alt={ty.name} />
                            <p className="text-sm text-white mr-2">{ty.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <NavInView />
        </div>
    )
}

export default PokeView