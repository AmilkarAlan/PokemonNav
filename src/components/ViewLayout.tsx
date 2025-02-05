import { useMemo } from "react";
import { useSelector } from "react-redux"

const ViewLayout = () => {
    const { pokemon } = useSelector((state: any) => state.pokemon)

    const styles = useMemo(() => {
        const colorOverrides: Record<string, string> = {
            brown: "amber-900",
        };

        const colorName = pokemon.color.name;
        const bgColor = `var(--color-${colorOverrides[colorName] || colorName}${colorName !== "white" && colorName !== "black" && !colorOverrides[colorName] ? "-500" : ""})`;

        const textColor = colorName === "white" ? "black" : "white";

        return { backgroundColor: bgColor, color: textColor };
    }, [pokemon.color.name]);

    return (
        <div className='w-full h-full flex flex-col items-center' style={styles}>
            <div className='w-full h-full flex px-8 pt-4' >
                <div className='w-full h-full grid grid-cols-2 grid-rows-2 gap-2 mr-2'>
                    <div className='w-fit h-full flex flex-col gap-4'>
                        <div className='w-full h-12 flex gap-2'>
                            <p className="text-3xl font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                            <p className="text-lg text-gray-300 font-extralight self-center"><span className="font-bold mr-0.5">#</span>{pokemon.id.toString().padStart(4, "0")}</p>
                        </div>
                        <div className='flex gap-4'>
                            {pokemon.types.map((ty: string, i: number) => (
                                <div className='w-1/2 h-6 border rounded-2xl text-center' key={i}>
                                    <p>{ty.type.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-full h-20 col-span-2'>
                        <p>{pokemon.description[0].flavor_text}</p>
                    </div>
                </div>
                <div className='w-full h-full flex items-center justify-center relative'>
                    <img className="h-full object-fill -bottom-3 absolute z-10" src={pokemon.sprites.fullImg ?? pokemon.sprites.other} alt="" />
                </div>
            </div>
            <div className='w-full h-full flex bg-amber-100 flex-col rounded-t-2xl'>
                <div className='w-full h-fit flex gap-4 px-8'>
                    <div className='w-full h-10 bg-slate-500 '></div>
                    <div className='w-full h-10 bg-slate-500 '></div>
                    <div className='w-full h-10 bg-slate-500 '></div>
                    <div className='w-full h-10 bg-slate-500 '></div>

                </div>
                <div className='w-full h-full flex flex-col gap-2 justify-center px-8 '>
                    <div className='w-full h-4 bg-slate-500 '></div>
                    <div className='w-full h-4 bg-slate-500 '></div>
                    <div className='w-full h-4 bg-slate-500 '></div>
                    <div className='w-full h-4 bg-slate-500 '></div>
                    <div className='w-full h-4 bg-slate-500 '></div>
                    <div className='w-full h-4 bg-slate-500 '></div>

                </div>
            </div>
        </div>
    )
}

export default ViewLayout