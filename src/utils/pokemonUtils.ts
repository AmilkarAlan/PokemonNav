import { fetchFromApi } from "./api";
import { EvolutionChain, Evolutions, Pokemon, PokemonSpecies } from "./types";

export const pokeBasicInfo = async (input: string | number): Promise<Pokemon | null> => {
    try {
        const data = await fetchFromApi("pokemon", input);
        const { id, name, sprites, stats, abilities } = data
        const formatStats = stats.map((stat: { base_stat: number; effort?: number; stat: { name: string }; }) => ({
            base_stat: stat.base_stat,
            statName: stat.stat.name
        }))
        const formatAbilities = abilities.map((ab: { ability: { name: string }; slot: number }) => ({
            abilityName: ab.ability.name,
            slot: ab.slot
        }))
        return { id, name, sprites, stats: formatStats, abilities: formatAbilities }
    } catch (error) {
        console.log(error);
        return null
    }
};

export const pokemonExtraInfo = async (input: string | number) => {
    try {
        const data: PokemonSpecies = await fetchFromApi("pokemon-species", input);
        const { color, evolution_chain, evolves_from_species } = data;
        const evolId = parseInt(evolution_chain.url.split("/").slice(-2)[0]);
        const evolData: EvolutionChain = await fetchFromApi("evolution-chain", evolId);
        let evolutions: Evolutions = {
            notEvolution: true
        }
        if (evolData.chain.evolves_to.length > 0) {
            evolutions = {
                notEvolution: false,
                firstEvol: { name: evolData.chain.evolves_to[0].species.name, id: parseInt(evolData.chain.evolves_to[0].species.url.split("/").slice(-2)[0]) }
            }
        }
        if (evolData.chain.evolves_to[0]?.evolves_to.length) {
            evolutions = {
                ...evolutions,
                lastEvol: { name: evolData.chain.evolves_to[0].evolves_to[0].species.name, id: parseInt(evolData.chain.evolves_to[0].evolves_to[0].species.url.split("/").slice(-2)[0]) }
            }
        }

        return { color, evolId, evolves_from_species, evolutions }

    } catch (error) {
        console.log(error);
    }

}