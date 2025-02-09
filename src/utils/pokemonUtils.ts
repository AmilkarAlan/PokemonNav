import { fetchFromApi } from "./api";
import { EvolutionChain, Evolutions, Pokemon, PokemonSpecies } from "./types";
// Primero intentamos obtener las descripciones en el idioma del navegador
const language = navigator.language || navigator.userLanguage;
const languageCode = language.split('-')[0];
const pokeBasicInfo = async (input: string | number) => {
    try {
        const data = await fetchFromApi("pokemon", input);
        const { id, name, sprites, stats, abilities, types, height, weight } = data;

        const baseType = await Promise.all(types.map(async (type) => {
            const id = parseInt(type.type.url.split("/").slice(-2)[0]);
            const typeData = await fetchFromApi("type", id);
            const typeNameChange = typeData.names.filter((n) => n.language.name === languageCode);
            const name = typeNameChange.length > 0 ? typeNameChange[0].name : typeData.names.find((n) => n.language.name === "en")?.name;
            return {
                name,
                id,
                slot: type.slot,
                icon: `/src/assets/icons/${typeData.name}.svg`
            }
        }))
        const baseStats = await Promise.all(stats.map(async (stat) => {
            const id = parseInt(stat.stat.url.split("/").slice(-2)[0]);
            const statData = await fetchFromApi("stat", id);
            const statNameChange = statData.names.filter((n) => n.language.name === languageCode);
            const name = statNameChange.length > 0 ? statNameChange[0].name : statData.names.find((n) => n.language.name === "en")?.name;
            return {
                name,
                id,
                base_stat: stat.base_stat
            }
        }))
        const baseAbilities = await Promise.all(abilities.map(async (ab) => {
            const id = parseInt(ab.ability.url.split("/").slice(-2)[0]);
            const abilityData = await fetchFromApi("ability", id);
            const abilityNameChange = abilityData.names.filter((n) => n.language.name === languageCode);
            const name = abilityNameChange.length > 0 ? abilityNameChange[0].name : abilityData.names.find((n) => n.language.name === "en")?.name;
            return {
                name,
                id,
                slot: ab.slot
            }
        }))


        return {
            id,
            name,
            weight,
            height,
            sprites: {
                fullImg: sprites.other.dream_world.front_default,
                miniImg: sprites.front_default,
                other: sprites.other.home.front_default
            },
            stats: baseStats,
            abilities: baseAbilities,
            types: baseType,
        };
    } catch (error) {
        console.error("Error en pokeBasicInfo:", error);
        throw new Error("No se pudo obtener la información básica del Pokémon");
    }
};

const pokeExtraInfo = async (input: string | number) => {
    try {
        const data: PokemonSpecies = await fetchFromApi("pokemon-species", input);
        const { color, evolution_chain, flavor_text_entries, genera, evolves_from_species } = data;

        const isEvolution = evolves_from_species ? true : false;
        const evolvesFrom = () => {
            if (evolves_from_species) return {
                name: evolves_from_species?.name,
                id: evolves_from_species?.url.split("/").slice(-2)[0]
            }
            return null

        };

        const changeText = (language: string, arr: { genus: string, language: { name: string, url: string } }) => {
            let traductionText = arr.filter(entry => entry.language.name === languageCode)
                .map(tx => ({
                    text: tx.flavor_text || tx.genus || "no entry",
                    language: { name: tx.language?.name, id: parseInt(tx.language.url.split("/").slice(-2)[0]) }
                }));
            if (traductionText.length === 0) {
                traductionText = arr
                    .filter(entry => entry.language.name === "en") // Filtramos por inglés
                    .map(tx => ({
                        text: tx.flavor_text || tx.genus || "no entry",
                        language: { name: tx.language?.name, id: parseInt(tx.language.url.split("/").slice(-2)[0]) }
                    }));
            }
            return traductionText;
        }

        const colorFormat = {
            name: color.name,
            id: parseInt(color.url.split("/").slice(-2)[0])
        };

        return { color: colorFormat, evolId: parseInt(evolution_chain.url.split("/").slice(-2)[0]), description: changeText(languageCode, flavor_text_entries), genera: changeText(languageCode, genera), isEvolution, evolves_from: evolvesFrom() };
    } catch (error) {
        console.error("Error en pokeExtraInfo:", error);
        throw new Error("No se pudo obtener información adicional del Pokémon");
    }
};

const extractEvolutions = async (chain: any): Promise<Evolutions> => {
    const { sprites } = await pokeBasicInfo(parseInt(chain.species.url.split("/").slice(-2)[0]));

    const evolutions: Evolutions = {
        id: parseInt(chain.species.url.split("/").slice(-2)[0]),
        baseEvol: { name: chain.species.name, id: parseInt(chain.species.url.split("/").slice(-2)[0]), miniImg: sprites.miniImg },
        notEvolution: chain.evolves_to.length === 0,
        nextEvol: [],  // Ahora será un array
    };

    if (chain.evolves_to.length > 0) {
        evolutions.nextEvol = await Promise.all(
            chain.evolves_to.map(async (evol: any) => {
                const { sprites } = await pokeBasicInfo(parseInt(evol.species.url.split("/").slice(-2)[0]));
                return {
                    name: evol.species.name,
                    id: parseInt(evol.species.url.split("/").slice(-2)[0]),
                    miniImg: sprites.miniImg,
                    evol_level: evol.evolution_details[0]?.min_level || null
                };
            })
        );

        // Si hay una segunda fase de evolución (última evolución)
        if (chain.evolves_to.some(evol => evol.evolves_to.length > 0)) {
            evolutions.lastEvol = await Promise.all(
                chain.evolves_to.flatMap(evol =>
                    evol.evolves_to.map(async (finalEvol: any) => {
                        const { sprites } = await pokeBasicInfo(parseInt(finalEvol.species.url.split("/").slice(-2)[0]));
                        return {
                            name: finalEvol.species.name,
                            id: parseInt(finalEvol.species.url.split("/").slice(-2)[0]),
                            miniImg: sprites.miniImg,
                            evol_level: finalEvol.evolution_details[0]?.min_level || null
                        };
                    })
                )
            );
        }
    }

    return evolutions;
};

const pokeEvolutions = async (id: number | string) => {
    try {
        const evolData: EvolutionChain = await fetchFromApi("evolution-chain", id);
        const evolutionsChain = await extractEvolutions(evolData.chain);

        return evolutionsChain
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
        const evolutions = await pokeEvolutions(extraInfo.evolId);
        const { evolId, ...extraInfoFilter } = extraInfo

        return { ...basicInfo, ...extraInfoFilter, evolutions };
    } catch (error) {
        console.error("Error en pokeInfo:", error);
        return null;
    }
};