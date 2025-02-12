import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPokeData } from "../store/pokemonSlice";

const ButtonsPad = ({ id }: { id: number }) => {
    const dispatch = useDispatch();
    const LAST_POKEMON_ID = 1010;

    const prevId = id > 1 ? id - 1 : LAST_POKEMON_ID;
    const nextId = id < LAST_POKEMON_ID ? id + 1 : 1;
    const [prevImageLoaded, setPrevImageLoaded] = useState(false);
    const [nextImageLoaded, setNextImageLoaded] = useState(false);

    const handleImageError = (setImageLoaded) => {
        setImageLoaded(false); // Si hay error, se muestra la imagen predeterminada
    };

    const getPokemonImage = (id) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    return (
        <div className="w-full h-fit flex">
            <div className="h-10 w-full flex" onClick={() => dispatch(fetchPokeData(prevId))}>
                <div className="w-1/2 h-full bg-slate-600 rounded-br-sm">
                    <img
                        src={getPokemonImage(prevId)}
                        alt={`Pokémon ${prevId}`}
                        onError={() => handleImageError(setPrevImageLoaded)}
                        onLoad={() => setPrevImageLoaded(true)}
                        loading="lazy"
                        width={50} // Ajusta el tamaño según lo que necesites
                    />
                </div>
                <button className="w-full h-2/3 bg-slate-600">
                    <p className="text-lg text-white font-extralight"><span className="mr-0.5">#</span>{prevId.toString().padStart(4, "0")}</p>
                </button>
            </div>
            <div className="h-10 w-full flex" onClick={() => dispatch(fetchPokeData(nextId))}>
                <button className="w-full h-2/3 bg-slate-600">
                    <p className="text-lg text-white font-extralight"><span className="mr-0.5">#</span>{nextId.toString().padStart(4, "0")}</p>
                </button>
                <div className="w-1/2 h-full bg-slate-600 rounded-bl-sm">
                    <img
                        src={getPokemonImage(nextId)}
                        alt={`Pokémon ${nextId}`}
                        onError={() => handleImageError(setNextImageLoaded)}
                        onLoad={() => setNextImageLoaded(true)}
                        loading="lazy"
                        width={50} // Ajusta el tamaño según lo que necesites
                    />
                </div>
            </div>
        </div>
    )
}

export default ButtonsPad