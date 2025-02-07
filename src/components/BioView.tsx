import { PokemonType } from "../utils/types";




const BioView = ({ description, weight, height, types, color }: {
    description: {
        text: string;
        langage: { name: string, id: number };
    };
    weight: number;
    height: number;
    types: PokemonType;
    color: string
}) => {

    const formatNumber = (input: number): string => {

        const numberToDec = input / 10;

        return `${numberToDec.toFixed(1)}`;
    };
    const getRandomDescription = (descriptions: { text: string }) => {
        if (descriptions.length === 0) return ""; // Si no hay descripciones, retornar vacío
        const randomIndex = Math.floor(Math.random() * descriptions.length); // Índice aleatorio
        return descriptions[randomIndex].text; // Retornar el texto seleccionado
    };
    console.log(`rgba(${color}, 0.5)`);

    return (
        <div className='w-full h-full flex flex-col mt-4 '>
            <div>
                <div className='w-full flex justify-center gap-4'>
                    {types.map((ty: string, i: number) => (
                        <div className='w-fit h-fit flex items-center gap-2 bg-slate-500 rounded-r-md rounded-l-3xl shadow-md shadow-black mb-4' key={i}>
                            <img className="w-10" src={ty.icon} alt={ty.name} />
                            <p className="text-sm text-white mr-2">{ty.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-full flex">
                <div className="w-fit flex gap-4 items-start p-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-xl font-bold">Altura</p>
                        <p className="text-lg font-extralight">{formatNumber(height)}m</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-xl font-bold">Peso</p>
                        <p className="text-lg font-extralight">{formatNumber(weight)}Kg</p>
                    </div>
                </div>
                <div className="w-full flex flex-col text-pretty p-4">
                    <p className="text-xl font-bold">Descripción de la pokedex.</p>
                    <p className="text-lg font-light">{getRandomDescription(description)}</p>
                </div>
            </div>

        </div>
    )
}

export default BioView