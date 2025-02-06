import { useMemo } from "react";
import { useSelector } from "react-redux"
import PokeballIcon from "./PokeballIcon";

const ViewLayout = () => {
    const { pokemon } = useSelector((state: any) => state.pokemon)

    const styles = useMemo(() => {
        const colorOverrides: Record<string, string> = {
            brown: "amber-900",
            white: "black"
        };
        const colorName = pokemon.color.name;
        const bgColor = `var(--color-${colorOverrides[colorName] || colorName}${colorName !== "black" && !colorOverrides[colorName] ? "-500" : ""})`;
        const textColor = colorName === "white" ? "black" : "white";
        return { fill: bgColor, height: "80%", position: "absolute", opacity: "0.70" };
    }, [pokemon.color.name]);

    return (
        <div className='w-full h-full flex flex-col items-center bg-gray-100 relative' >
            <PokeballIcon style={styles} />
            <div className='w-full h-full flex flex-col px-8 pt-4 z-50 relative'>
                <div className='w-full h-full flex flex-col gap-2 relative lg:flex-row'>
                    <div className='w-full h-full flex justify-center lg:flex-col'>
                        <p className="text-2xl text-gray-600 font-extralight"><span className="font-bold mr-0.5">#</span>{pokemon.id.toString().padStart(4, "0")}</p>
                        <p className="text-6xl font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        <div className='flex gap-4 mt-2'>
                        {pokemon.types.map((ty: string, i: number) => (
                            <div className='w-fit h-fit flex items-center gap-2 bg-slate-500 rounded-r-lg rounded-l-3xl' key={i}>
                                <img className="w-10" src={ty.icon} alt={ty.name} />
                                <p className="text-lg text-white mr-2">{ty.name}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className='w-full h-full flex justify-center'>
                        <img className="h-full object-fill -bottom-5 z-20 absolute" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex bg-white flex-col rounded-t-2xl z-10' >
                <div className='w-full h-fit flex gap-4 px-8'>
                    <div className='w-full h-10 bg-slate-500 rounded-b-2xl shadow-lg shadow-black/45'>
                        <p>Bio</p>
                    </div>
                    <div className='w-full h-10 bg-slate-500 rounded-b-2xl'>
                        <p>Estadisticas</p>
                    </div>
                </div>
                <div className='w-full h-full flex flex-col gap-2 justify-center px-8 '>

                    <div className='w-full h-20 col-span-2'>
                        <p className="text-lg text-pretty">{pokemon.description[0].flavor_text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLayout