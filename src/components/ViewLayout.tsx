import { useMemo, useState } from "react";
import { useSelector } from "react-redux"
import PokeballIcon from "./PokeballIcon";
import BioView from "./BioView";
import Evolutions from "./Evolutions";
import StatsView from "./StatsView";

const ViewLayout = () => {
    const { pokemon, loading } = useSelector((state: any) => state.pokemon)
    const [tabActive, setTabActive] = useState("bio");

    const styles = useMemo(() => {
        const colorOverrides: Record<string, string> = {
            brown: "amber-900",
            white: "black"
        };
        const colorName = pokemon.color?.name;
        const bgColor = `var(--color-${colorOverrides[colorName] || colorName}${colorName !== "black" && !colorOverrides[colorName] ? "-500" : ""})`;
        const textColor = colorName === "white" ? "black" : "white";
        return { fill: bgColor, width: "100%", height: "100%", position: "absolute", opacity: "0.60", animation: "finalSpin .5s linear", left:"50%"};
    }, [pokemon.color?.name]);

    const elemnts = [
        {
            tab: "bio",
            elemnt: <BioView description={pokemon.description.text} height={pokemon.height} weight={pokemon.weight} types={pokemon.types} color={styles.fill} abilities={pokemon.abilities} />
        },
        {
            tab: "estadisticas",
            elemnt: <StatsView stats={pokemon.stats} abilities={pokemon.abilities} />,
        },
        {
            tab: "evoluciones",
            elemnt: <Evolutions evolutions={pokemon.evolutions} />,
        }
    ]

    return (
        <div className='flex flex-col items-center bg-white relative' >
            <PokeballIcon style={styles} />
            <div className='w-full flex flex-col relative'>
                <div className='flex flex-col' style={{ animation: "inObject 1s linear" }}>
                    {/* {pokemon.isEvolution ? (
                            <div>
                            <p className="text-lg text-gray-600 font-light self-end">Evolución previa:</p>
                            <p className="text-xl text-gray-600 font-light self-end">{pokemon.evolves_from.name.charAt(0).toUpperCase() + pokemon.evolves_from.name.slice(1)}</p>
                            </div>
                            ) : null} */}
                    <div className="self-center">
                        <img className="w-full h-48 object-cover" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt={pokemon.name} />
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2 p-4'>
                    <div className='flex flex-col items-center' style={{ animation: "inObject 2s linear" }}>
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
            <div className='w-full flex bg-white flex-col rounded-t-2xl z-10' style={{ boxShadow: "0 0px 10px var(--color-black)", animation: "upContainer .3s ease-in" }} >
                <div className='w-full flex'>
                    {["bio", "estadisticas", "evoluciones"].map((tab, i) => (
                        <div onClick={() => setTabActive(tab)} key={i} className={`w-full flex items-end justify-center h-10 bg-white rounded-b-lg transition-all duration-200 cursor-pointer ${tabActive === tab ? "shadow-black/45 border-b-2" : ""} `} style={{ borderColor: styles.fill }}>
                            <p className={`text-xl transition-color ease-in duration-500 ${tabActive === tab ? "text-gray-800" : "text-gray-400"}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
                        </div>
                    ))}
                </div>
                <section className="h-full w-full">
                    {elemnts.find(e => e.tab === tabActive)?.elemnt || null}
                </section>
            </div>
        </div>
    )
}

export default ViewLayout