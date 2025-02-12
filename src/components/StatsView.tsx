import { PokemonAbility, PokemonStat } from "../utils/types"



const StatsView = ({ stats, abilities }: { stats: PokemonStat[], abilities: PokemonAbility[] }) => {


    return (
        <section className="px-8 pt-4">
            <div className="flex flex-col items-center">
                <p className="mb-2 font-bold text-lg">Habilidades</p>
                <div className="flex gap-2 justify-center">
                    {
                        abilities.map((ab, i) => (
                            <div key={i}  className='w-fit h-fit flex items-center gap-2 bg-slate-400 rounded-sm shadow-sm shadow-black mb-4 p-1'>
                                <p className="text-sm">{ab.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="pb-4">
                <p className="mb-2 font-bold text-lg">Estadisticas base</p>
                {
                    stats.map((stat, i) => (
                        <div className="flex justify-between px-2 text-sm" key={i}>
                            <p>{stat.name}</p>
                            <p>{stat.base_stat}</p>
                        </div>

                    ))
                }
            </div>
        </section>
    )
}

export default StatsView