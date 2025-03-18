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
        <div className="flex items-end justify-between w-full h-full relative">
            <div>
                <button className="group transition-all z-50  duration-200 text-gray-800 font-bold rounded rotate-z-180 rotate-x-180" onClick={() => dispatch(fetchPokeData(prevId))}>
                    {/* <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-left-0.5 before:rounded-tl-xl before:-top-0.5 before:z-50 before:shadow-[-3px_-3px_#4a5565] before:border-t-2 before:border-l-2  before:border-t-slate-700 before:border-l-slate-700"></div>
                <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:right-0 before:rounded-br-xl before:-top-5 before:z-50 before:shadow-[3px_5px_#62748e] before:border-b-2 before:border-r-2 before:border-b-slate-700 before:border-r-slate-700"></div>
                <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-left-5 before:rounded-br-xl before:bottom-0 before:z-50 before:shadow-[3px_5px_#62748e] before:border-b-2 before:border-r-2 before:border-b-slate-700 before:border-r-slate-700"></div> */}
                    <div className="bg-white inline-flex items-center rounded-xl">
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
                                className="w-5 md:w-10 fill-black"
                                id="left-arrow-foward-sign"
                                version="1.1"
                                viewBox="0 0 15.698 8.706">
                                <polygon points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 " />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
            <div>
                <button className="group transition-all z-50  duration-200 text-gray-800 font-bold rounded" onClick={() => dispatch(fetchPokeData(nextId))}>
                    <div className="bg-white inline-flex items-center rounded-xl">
                        {/* <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-left-0.5 before:rounded-tl-xl before:-top-0.5 before:z-50 before:shadow-[-10px_0px_#4a5565] before:border-t-2 before:border-l-2  before:border-t-slate-700 before:border-l-slate-700"></div>
                    <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:right-0 before:rounded-br-xl before:-top-5 before:z-50 before:shadow-[3px_5px_#62748e] before:border-b-2 before:border-r-2 before:border-b-slate-700 before:border-r-slate-700"></div>
                    <div className="before:absolute before:w-5 before:h-5 before:bg-transparent before:-left-5 before:rounded-br-xl before:bottom-0 before:z-50 before:shadow-[3px_5px_#62748e] before:border-b-2 before:border-r-2 before:border-b-slate-700 before:border-r-slate-700"></div> */}
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
                                className="w-5 md:w-10 fill-black"
                                id="right-arrow-foward-sign"
                                version="1.1"
                                viewBox="0 0 15.698 8.706">
                                <polygon points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 " />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>

    )
}

export default ButtonsPad