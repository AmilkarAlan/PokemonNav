import { fetchFromApi } from "./api";
import { EvolutionChain, Evolutions, Pokemon, PokemonSpecies } from "./types";

const pokeBasicInfo = async (input: string | number) => {
    try {
        const data = await fetchFromApi("pokemon", input);
        const { id, name, sprites, stats, abilities, types } = data;


        return {
            id,
            name,
            sprites: {
                fullImg: sprites.other.dream_world.front_default,
                miniImg: sprites.front_default,
                other: sprites.other.home.front_default
            },
            stats: stats.map((stat: { base_stat: number; stat: { name: string, url: string }; }) => ({
                base_stat: stat.base_stat,
                stat: { name: stat.stat.name, id: parseInt(stat.stat.url.split("/").slice(-2)[0]) }
            })),
            abilities: abilities.map((ab: { ability: { name: string, url: string }; slot: number }) => ({
                ability: { name: ab.ability.name, id: parseInt(ab.ability.url.split("/").slice(-2)[0]) },
                slot: ab.slot
            })),
            types: types.map((ty: { slot: number; type: { name: string, url: string }; }) => ({
                type: { name: ty.type.name, id: parseInt(ty.type.url.split("/").slice(-2)[0]) },
                slot: ty.slot
            }))
        };
    } catch (error) {
        console.error("Error en pokeBasicInfo:", error);
        throw new Error("No se pudo obtener la información básica del Pokémon");
    }
};

const pokeExtraInfo = async (input: string | number) => {
    try {
        const data: PokemonSpecies = await fetchFromApi("pokemon-species", input);
        const language = navigator.language || navigator.userLanguage;
        const languageCode = language.split('-')[0];
        const descriptionText = data.flavor_text_entries.filter(entry => entry.language.name === languageCode).map((tx) => ({
            flavor_text: tx.flavor_text,
            language: { name: tx.language.name, id: parseInt(tx.language.url.split("/").slice(-2)[0]) }
        }))
        const color = {
            name: data.color.name,
            id: parseInt(data.color.url.split("/").slice(-2)[0])
        };

        return { color, evolId: parseInt(data.evolution_chain.url.split("/").slice(-2)[0]), description: descriptionText };
    } catch (error) {
        console.error("Error en pokeExtraInfo:", error);
        throw new Error("No se pudo obtener información adicional del Pokémon");
    }
};

const extractEvolutions = (chain: any): Evolutions => {
    const evolutions: Evolutions = {
        id: parseInt(chain.species.url.split("/").slice(-2)[0]),
        baseEvol: { name: chain.species.name, id: parseInt(chain.species.url.split("/").slice(-2)[0]) },
        notEvolution: chain.evolves_to.length === 0
    };

    if (chain.evolves_to.length > 0) {
        evolutions.nextEvol = {
            name: chain.evolves_to[0].species.name,
            id: parseInt(chain.evolves_to[0].species.url.split("/").slice(-2)[0])
        };

        if (chain.evolves_to[0].evolves_to.length > 0) {
            evolutions.lastEvol = {
                name: chain.evolves_to[0].evolves_to[0].species.name,
                id: parseInt(chain.evolves_to[0].evolves_to[0].species.url.split("/").slice(-2)[0])
            };
        }
    }

    return evolutions;
};

const pokeEvolutions = async (id: number | string) => {
    try {
        const evolData: EvolutionChain = await fetchFromApi("evolution-chain", id);
        return extractEvolutions(evolData.chain);
    } catch (error) {
        console.error("Error en pokeEvolutions:", error);
        throw new Error("No se pudo obtener la evolución del Pokémon");
    }
};

export const pokeInfo = async (input: number | string): Promise<Pokemon | null> => {
    try {
        const [basicInfo, extraInfo] = await Promise.all([
            pokeBasicInfo(input),
            pokeExtraInfo(input)
        ]);

        if (!basicInfo || !extraInfo) {
            throw new Error("No se pudo obtener información completa del Pokémon");
        }
        const { evolId, ...extraInfoFilter } = extraInfo
        const evolutions = await pokeEvolutions(extraInfo.evolId);

        return { ...basicInfo, ...extraInfoFilter, evolutions };
    } catch (error) {
        console.error("Error en pokeInfo:", error);
        return null;
    }
};