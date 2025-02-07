import { useMemo, useState } from "react";
import { useSelector } from "react-redux"
import PokeballIcon from "./PokeballIcon";
import BioView from "./BioView";

const ViewLayout = () => {
    const { pokemon, loading } = useSelector((state: any) => state.pokemon)
    const [tabActive, setTabActive] = useState("bio");

    const styles = useMemo(() => {
        const colorOverrides: Record<string, string> = {
            brown: "amber-900",
            white: "black"
        };
        const colorName = pokemon.color.name;
        const bgColor = `var(--color-${colorOverrides[colorName] || colorName}${colorName !== "black" && !colorOverrides[colorName] ? "-500" : ""})`;
        const textColor = colorName === "white" ? "black" : "white";
        return { fill: bgColor, height: "80%", position: "absolute", opacity: "0.60", animation: "finalSpin .5s linear" };
    }, [pokemon.color.name]);

    return (
        <div className='w-full h-full flex flex-col items-center bg-white relative' >
            <PokeballIcon style={styles} />
            <div className='w-full h-full flex flex-col px-8 pt-4 z-50 relative'>
                <div className='w-full h-full flex flex-col gap-2 relative lg:flex-row'>
                    <div className='w-full h-full flex justify-center lg:flex-col' style={{ animation: "inObject 2s linear" }}>
                        <p className="text-xl text-gray-600 font-extralight"><span className="font-bold mr-0.5">#</span>{pokemon.id.toString().padStart(4, "0")}</p>
                        <p className="text-6xl font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        <p className="text-2xl text-gray-600 font-light">{pokemon.genera[0].text}</p>
                    </div>
                    <div className='w-full h-full flex flex-col' style={{ animation: "inObject 1s linear" }}>
                        <img className="h-full object-fill -bottom-5 self-center z-20 absolute" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt={pokemon.name} />
                        <p className="text-lg text-gray-600 font-light self-end">{pokemon.isEvolution ? "Evolución previa:" : ""} </p>
                        <p className="text-xl text-gray-600 font-light self-end">{pokemon.isEvolution ? (pokemon.evolves_from.name.charAt(0).toUpperCase() + pokemon.evolves_from.name.slice(1)) : ""}</p>
                    </div>
                </div>
            </div>

            <div className='w-full h-full flex bg-white flex-col rounded-t-2xl z-10' style={{ boxShadow: "0 0px 10px var(--color-black)", animation: "upContainer .3s ease-in" }} >
                <div className='w-full flex gap-4 px-8'>
                    {["bio", "estadisticas"].map((tab, i) => (
                        <div onClick={() => setTabActive(tab)} key={i} className={`w-full flex items-end justify-center h-10 bg-white rounded-b-2xl transition-shadow duration-200 cursor-pointer ${tabActive === tab ? "shadow-md shadow-black/45 border-b-1 border-yellow-500" : "shadow-sm"} `} style={{ borderColor: styles.fill }}>
                            <p className={`text-xl transition-color ease-in duration-500 ${tabActive === tab ? "text-gray-800" : "text-gray-400"}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
                        </div>
                    ))}
                </div>
                {tabActive === "bio" ? <BioView description={pokemon.description} height={pokemon.height} weight={pokemon.weight} types={pokemon.types} color={styles.fill} /> : ""}

            </div>
        </div>
    )
}

export default ViewLayout