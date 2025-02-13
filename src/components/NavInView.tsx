import { useState } from "react";
import { useSelector } from "react-redux";
import abrirArriba from "../assets/icons/abrirArriba.svg"
import cerrarAbajo from "../assets/icons/cerrarAbajo.svg"
import BioView from "./BioView";
import StatsView from "./StatsView";
import EvolutionsView from "./EvolutionsView";

const NavInView = () => {
    const [openTab, setOpenTav] = useState(false)
    const [tabActive, setTabActive] = useState("bio");
    const { pokemon, loading } = useSelector((state: any) => state.pokemon)

    const handleOpen = (tab: string) => {
        if (!openTab) {
            setOpenTav(!openTab)
            setTabActive(tab)
        }
        setTabActive(tab)
    }

    const elemnts = [
        {
            tab: "bio",
            elemnt: <BioView description={pokemon.description.text} height={pokemon.height} weight={pokemon.weight} types={pokemon.types} color={"black"} abilities={pokemon.abilities} />
        },
        {
            tab: "estadisticas",
            elemnt: <StatsView stats={pokemon.stats} abilities={pokemon.abilities} />,
        },
        {
            tab: "evoluciones",
            elemnt: <EvolutionsView evolutions={pokemon.evolutions} />,
        }
    ]
    return (
        <section className={`w-full h-[90%] flex bg-white flex-col rounded-t-xl absolute z-40 transition-all duration-300 bottom-0 ${openTab ? "translate-y-0" : "translate-y-[90%]"}`} style={{ boxShadow: "0 0px 10px var(--color-black)" }} >
            <div className='w-full flex flex-col'>
                <div className="w-full flex justify-center">
                    <button onClick={() => setOpenTav(!openTab)}><img className="w-10" src={openTab ? cerrarAbajo : abrirArriba} alt="" /></button>

                </div>
                <div className="flex">
                    {elemnts.map((tab, i) => (
                        <div onClick={() => handleOpen(tab.tab)} key={i} className={`w-full flex items-end justify-center h-10 bg-white rounded-b-lg transition-all duration-100 cursor-pointer ${tabActive === tab ? "shadow-black/45 border-b-2" : ""} `} style={{ borderColor: pokemon.color.name }}>
                            <p className={`text-xl transition-color ease-in duration-300 ${tabActive === tab.tab ? "text-gray-800" : "text-gray-400"}`}>{tab.tab.charAt(0).toUpperCase() + tab.tab.slice(1)}</p>
                        </div>
                    ))}
                </div>
                <div className="h-full w-full">
                    {elemnts.find(e => e.tab === tabActive)?.elemnt || null}
                </div>
            </div>
        </section>
    )
}

export default NavInView