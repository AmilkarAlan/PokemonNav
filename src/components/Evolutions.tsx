import React from 'react'
import { Evolutions } from '../utils/types'
import FlechaDerechaIcon from './FlechaDerechaIcon'

const Evolutions = ({ evolutions }: { evolutions: Evolutions }) => {
    return (
        <div className='w-full h-full flex justify-center items-center gap-8'>
            {/* Renderiza la evolución base */}
            <div className='flex flex-col items-center self-center'>
                <img src={evolutions.baseEvol?.miniImg} alt={evolutions.baseEvol?.name} />
                <p className="text-sm text-gray-600 font-extralight">
                    <span className="mr-0.5">#</span>{evolutions.baseEvol?.id.toString().padStart(4, "0")}
                    <span> {evolutions.baseEvol?.name.charAt(0).toUpperCase() + evolutions.baseEvol?.name.slice(1)}</span>
                </p>
            </div>

            {/* Verifica si hay evoluciones siguientes */}
            {!evolutions.notEvolution && evolutions.nextEvol && (
                <div className='flex flex-col justify-center'>
                    {evolutions.nextEvol.map((evolution, index) => (
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

            {/* Si existe una última evolución, agrégala al final */}
            {
                evolutions.lastEvol && (
                    <div className='flex flex-col justify-center'>
                        {evolutions.lastEvol.map((evolution, index) => (
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
        </div >
    )
}

export default Evolutions
