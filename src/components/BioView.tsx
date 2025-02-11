import { useMemo } from "react";
import { PokemonType } from "../utils/types";




const BioView = ({ description, weight, height}: {
    description: string;
    weight: number;
    height: number;

}) => {

    const formatNumber = (input: number): string => {

        const numberToDec = input / 10;

        return `${numberToDec.toFixed(1)}`;
    };




    return (
        <div className='w-full h-full flex mt-4'>

            <div className="w-fit h-full flex flex-col gap-4 items-start">
                <div className="w-full flex justify-around">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-xl font-bold">Altura</p>
                        <p className="text-lg font-extralight">{formatNumber(height)}m</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-xl font-bold">Peso</p>
                        <p className="text-lg font-extralight">{formatNumber(weight)}Kg</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col text-pretty p-4">
                <div>
                    <p className="text-xl font-bold">Descripción de la pokedex.</p>
                    <p className="text-lg font-light">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default BioView