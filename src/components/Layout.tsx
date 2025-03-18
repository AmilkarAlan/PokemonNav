import React from 'react'
import { useSelector } from "react-redux"
import PokeView from "./PokeView"
import Search from "./Search"
import { useMemo } from "react"
import PokeballIcon from "./PokeballIcon"
import ButtonsPad from "./ButtonsPad"
import FlechaDerechaIcon from "./FlechaDerechaIcon"
import PokemonStatChart from './StatComponent'

const Layout = () => {
    const { pokemon, loading } = useSelector((state: any) => state.pokemon)
    const formatNumber = (input: number): string => {

        const numberToDec = input / 10;

        return `${numberToDec.toFixed(1)}`;
    };
    const styles = useMemo(() => {
        if (!pokemon) {
            return;
        }
        const colorOverrides: Record<string, string> = {
            brown: "amber-900",
            white: "black"
        };
        const colorName = pokemon.color?.name;
        const bgColor = `var(--color-${colorOverrides[colorName] || colorName}${colorName !== "black" && !colorOverrides[colorName] ? "-500" : ""})`;
        const textColor = colorName === "white" ? "black" : "white";
        return { fill: bgColor, color: textColor };
    }, [pokemon?.color?.name]);
    return (
        <div className="h-screen w-full grid grid-cols-5 grid-rows-5 gap-4">
            {/* <PokeballIcon style={{
                animation: `${!loading ? "finalSpin .5s linear" : "blink 2s linear infinite"}`,
                translate: !loading ? "50%" : "0",
                transition: "translate .5s ease-in-out",
                zIndex: 1,
                ...styles
            }} /> */}
            <Search />
            <div className="w-full h-full flex flex-col col-span-2 row-span-4 col-start-1 row-start-2 rounded-xl bg-white border-4" style={{ borderColor: styles?.fill }}>
                {loading | !pokemon ? null : (
                    <>
                        <div className="flex justify-center w-full h-fit p-2 ">
                            <h2 className="font-pokemon-solid text-2xl rounded-md tracking-widest" style={{ color: styles?.fill }}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                            <p className="text-md font-extralight text-gray-500 font-pokemon-solid tracking-widest"><span className="font-bold mr-0.5">#</span>{pokemon.id.toString().padStart(4, "0")}</p>
                        </div>
                        <div className="relative w-full h-full flex flex-col items-center gap-2 mt-2">
                            <p className="text-lg font-thin text-gray-500">{pokemon.genera.text}</p>
                            <img className="w-48 object-cover" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt={pokemon.name} loading="lazy" />
                            <div className='w-full flex justify-center gap-4 mt-2'>
                                {pokemon.types.map((ty: string, i: number) => (
                                    <div className='w-fit h-fit flex items-center gap-2 bg-slate-500 rounded-r-md rounded-l-3xl shadow-md shadow-black mb-4' key={i}>
                                        <img className="w-5" src={ty.icon} alt={ty.name} />
                                        <p className="text-sm text-white mr-2">{ty.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='h-full'>
                            <ButtonsPad id={pokemon.id} />
                        </div>
                    </>)}
            </div>
            <div className="w-full row-span-5 col-start-3 row-start-1 rounded-xl bg-white border-4" style={{ borderColor: styles?.fill }}>
                {loading | !pokemon ? null : (
                    <>
                        <div className="flex flex-col items-center">
                            <p className="mb-2 font-bold text-lg">Habilidades</p>
                            <div className="flex gap-2 justify-center">
                                {
                                    pokemon.abilities.map((ab, i) => (
                                        <div key={i} className='w-fit h-fit flex items-center gap-2 text-white bg-slate-500 rounded-sm shadow-sm shadow-black mb-4 p-1'>
                                            <p className="text-sm">{ab.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-full flex justify-around">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-xl font-bold">Altura</p>
                                <p className="text-lg font-extralight">{formatNumber(pokemon.height)}m</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-xl font-bold">Peso</p>
                                <p className="text-lg font-extralight">{formatNumber(pokemon.weight)}Kg</p>
                            </div>
                        </div>
                        <div className="pb-4">
                            <p className="mb-2 font-bold text-lg">Estadisticas base</p>
                            {
                                pokemon.stats.map((stat, i) => (
                                    <div className="w-full h-full flex justify-between items-center px-2 text-sm" key={i}>
                                        <p>{stat.name}</p>
                                        <PokemonStatChart stat={stat.base_stat} color={styles?.fill}/>
                                    </div>

                                ))
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="w-full col-span-2 row-span-2 col-start-4 row-start-1 rounded-xl bg-white border-4" style={{ borderColor: styles?.fill }}>
                {loading | !pokemon ? null : (
                    <div className="w-full flex flex-col text-pretty p-4">
                        <div>
                            <p className="text-xl font-bold">Descripción de la pokedex.</p>
                            <p className="text-lg font-light">{pokemon.description.text}</p>
                        </div>
                    </div>)}
            </div>
            <div className="w-full col-span-2 row-span-3 col-start-4 row-start-3 rounded-xl bg-white border-4" style={{ borderColor: styles?.fill }}>
                {loading | !pokemon ? null : (
                    <div className='w-full h-full flex justify-center items-center gap-8'>

                        <div className='flex flex-col items-center self-center'>
                            <img src={pokemon.evolutions.baseEvol?.miniImg} alt={pokemon.evolutions.baseEvol?.name} />
                            <p className="text-sm text-gray-600 font-extralight">
                                <span className="mr-0.5">#</span>{pokemon.evolutions.baseEvol?.id.toString().padStart(4, "0")}
                                <span> {pokemon.evolutions.baseEvol?.name.charAt(0).toUpperCase() + pokemon.evolutions.baseEvol?.name.slice(1)}</span>
                            </p>
                        </div>

                        {!pokemon.evolutions.notEvolution && pokemon.evolutions.nextEvol && (
                            <div className='flex flex-col justify-center'>
                                {pokemon.evolutions.nextEvol.map((evolution, index) => (
                                    <React.Fragment key={evolution.id}>

                                        <div className='flex items-center gap-4'>
                                            <div>
                                                <FlechaDerechaIcon style={{ fill: "var(--color-gray-600)", opacity: "0.60" }} />
                                                <p className='text-sm text-gray-600 font-extralight'>Nivel {evolution.evol_level}</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <img src={evolution.miniImg} alt={evolution.name} />
                                                <p className="text-sm text-gray-600 font-extralight">
                                                    <span className="mr-0.5">#</span>{evolution.id.toString().padStart(4, "0")}
                                                    <span> {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )
                        }
                        {
                            pokemon.evolutions.lastEvol && (
                                <div className='flex flex-col justify-center'>
                                    {pokemon.evolutions.lastEvol.map((evolution, index) => (
                                        <React.Fragment key={evolution.id}>
                                            <div className='flex items-center gap-4'>
                                                <div>
                                                    <FlechaDerechaIcon style={{ fill: "var(--color-gray-600)", opacity: "0.60" }} />
                                                    <p className='text-sm text-gray-600 font-extralight'>Nivel {evolution.evol_level}</p>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <img src={evolution.miniImg} alt={evolution.name} />
                                                    <p className="text-sm text-gray-600 font-extralight">
                                                        <span className="mr-0.5">#</span>{evolution.id.toString().padStart(4, "0")}
                                                        <span> {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            )
                        }
                    </div >)}
            </div>





            {/* <div className="flex flex-col w-1/2 h-full rounded-xl relative">
                <div className="bg-gray-600 w-full h-1/2 flex flex-col items-center justify-center relative rounded-lg border-2 border-slate-700">
                    <div className="bg-slate-500 absolute -top-0.5 border-t-2 border-t-slate-500 border-2 border-slate-700 w-1/2 h-fit p-2 text-center">
                        <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-left-5 before:rounded-tr-xl before:-top-0.5 before:z-50 before:shadow-[0rem_-0.375rem_#62748e] before:border-t-2 before:border-r-2 before:border-t-slate-700 before:border-r-slate-700"></div>
                        <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-left-0.5 before:-bottom-0.5 before:z-50 before:rounded-bl-xl before:border-b-2 before:border-l-2 before:border-b-slate-700 before:border-l-slate-700 before:shadow-[-4px_4px_#4a5565]"></div>
                        <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-right-5 before:rounded-tl-xl before:-top-0.5 before:z-50 before:shadow-[0rem_-0.375rem_#62748e] before:border-t-2 before:border-l-2 before:border-t-slate-700 before:border-l-slate-700"></div>
                        <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-right-0.5 before:-bottom-0.5 before:z-50 before:rounded-br-xl before:border-b-2 before:border-r-2 before:border-b-slate-700 before:border-r-slate-700 before:shadow-[4px_4px_#4a5565]"></div>
                        {loading | !pokemon ? null : (
                            <h2 className="text-2xl bg-white rounded-md">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>)}
                    </div>
                    {loading | !pokemon ? null : (
                        <>
                            <div className="pt-14">
                                <img className="w-full h-48 object-cover" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt={pokemon.name} loading="lazy" />
                            </div>
                        </>)}
                </div>
                {loading | !pokemon ? null : (
                <div className="w-full h-fit relative">
                    <ButtonsPad id={pokemon.id} />
                </div>)}
                <div className="bg-gray-600 w-full h-1/2 flex flex-col items-center justify-center relative rounded-lg border-2 border-slate-700"></div>
            </div> */}
        </div>
    )
}

export default Layout