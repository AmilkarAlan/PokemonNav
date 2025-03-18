
import { useDispatch, useSelector } from 'react-redux'
import ViewLayout from './PokeView'
import { useEffect, useMemo } from 'react'
import { fetchPokeData } from '../store/pokemonSlice'
import PokeballIcon from './PokeballIcon'
import Layout from './Layout'



const PokeLayout = () => {
  const { pokemon, loading } = useSelector((state: any) => state.pokemon)

  const styles = useMemo(() => {
    if (!pokemon) {
      return;
    }
    const colorOverrides: Record<string, string> = {
      brown: "amber-900",
      white: "black"
    };
    const colorName = pokemon.color?.name;
    const bgColor = `var(--color-${colorOverrides[colorName] || colorName}${colorName !== "black" && !colorOverrides[colorName] ? "-500" : ""})`;
    const textColor = colorName === "white" ? "black" : "white";
    return { fill: bgColor, };
  }, [pokemon?.color?.name]);

  return (
    <section className={"h-full w-full flex flex-col bg-white relative overflow-hidden rounded-xl"}>
      <PokeballIcon style={{
        animation: `${!loading ? "finalSpin .5s linear" : "blink 2s linear infinite"}`,
        translate: !loading ? "50%" : "0",
        transition: "translate .5s ease-in-out",
        ...styles
      }} />
      {loading | !pokemon ? null : <Layout />}
    </section>

  )
}

export default PokeLayout