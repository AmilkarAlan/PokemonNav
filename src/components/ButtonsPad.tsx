import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPokeData } from "../store/pokemonSlice";
import flecha from "../assets/icons/flechaDerecha.svg"
import FlechaDerechaIcon from "./FlechaDerechaIcon";

const ButtonsPad = ({ id }: { id: number }) => {
    const dispatch = useDispatch();
    const LAST_POKEMON_ID = 1010;

    const prevId = id > 1 ? id - 1 : LAST_POKEMON_ID;
    const nextId = id < LAST_POKEMON_ID ? id + 1 : 1;
    // const [prevImageLoaded, setPrevImageLoaded] = useState(false);
    // const [nextImageLoaded, setNextImageLoaded] = useState(false);

    // const handleImageError = (setImageLoaded) => {
    //     setImageLoaded(false); // Si hay error, se muestra la imagen predeterminada
    // };

    const getPokemonImage = (id: number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    return (
        <div className="w-full h-full flex items-center justify-between absolute z-50">
            <button className="group bg-gray-300 transition-all duration-200 hover:bg-gray-400  hover:scale-105 text-gray-800 font-bold rounded inline-flex items-center rotate-z-180 rotate-x-180 px-2 py-1 md:py-2 md:px-4" onClick={() => dispatch(fetchPokeData(prevId))}>
                <img
                    className="w-5 md:w-10"
                    src={getPokemonImage(prevId)}
                    alt={`Pokémon ${prevId}`}
                    // onError={() => handleImageError(setPrevImageLoaded)}
                    // onLoad={() => setPrevImageLoaded(true)}
                    loading="lazy"
                />
                <div className="group-hover:animate-bounce">
                    <svg
                        className="w-5 md:w-10 fill-white"
                        id="left-arrow-foward-sign"
                        version="1.1"
                        viewBox="0 0 15.698 8.706">
                        <polygon points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 " />
                    </svg>
                </div>
            </button>
            <button className="group bg-gray-300 transition-all duration-200 hover:bg-gray-400  hover:scale-105 text-gray-800 font-bold rounded inline-flex items-center px-2 py-1 md:py-2 md:px-4" onClick={() => dispatch(fetchPokeData(nextId))}>
                <img
                    className="w-5 md:w-10 object-cover"
                    src={getPokemonImage(nextId)}
                    alt={`Pokémon ${nextId}`}
                    // onError={() => handleImageError(setPrevImageLoaded)}
                    // onLoad={() => setPrevImageLoaded(true)}
                    loading="lazy"
                />
                <div className="group-hover:animate-bounce">
                    {/* <FlechaDerechaIcon style={{ width: "25", fill: "white" }} /> */}
                    <svg
                        className="w-5 md:w-10 fill-white"
                        id="right-arrow-foward-sign"
                        version="1.1"
                        viewBox="0 0 15.698 8.706">
                        <polygon points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 " />
                    </svg>
                </div>
            </button>
        </div>

    )
}

export default ButtonsPad