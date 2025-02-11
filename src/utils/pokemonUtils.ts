import { fetchFromApi } from "./api";
import { EvolutionChain, Evolutions, Pokemon, PokemonSpecies } from "./types";
// Primero intentamos obtener las descripciones en el idioma del navegador
const language = navigator.language || navigator.userLanguage;
const languageCode = language.split('-')[0];

const fetchAndFormat = async (items: any[], endpoint: string) => {
    return await Promise.all(items.map(async (item) => {
        const id = parseInt(item[endpoint].url.split("/").slice(-2)[0]);
        const data = await fetchFromApi(endpoint, id);
        const localizedName = data.names.find(n => n.language.name === languageCode) 
            || data.names.find(n => n.language.name === "en");
        
        return {
            name: localizedName?.name,
            id,
            slot: item.slot || null,
            icon: endpoint === "type" ? `/src/assets/icons/${data.name}.svg` : undefined
        };
    }));
};

const pokeBasicInfo = async (input: string | number) => {
    try {
        const data = await fetchFromApi("pokemon", input);
        const { id, name, sprites, stats, abilities, types, height, weight } = data;

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
        const baseType = await fetchAndFormat(types, "type");
        // const baseStats = await fetchAndFormat(stats, "stat");
        const baseAbilities = await fetchAndFormat(abilities, "ability");
        
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

        const changeText = (arr: { genus: string, language: { name: string, url: string } }[]) => {
            console.log(arr);
            
            const traductionText = arr.find(entry => entry.language.name === languageCode) 
                || arr.find(entry => entry.language.name === "en");
            
            return traductionText 
                ? {
                    text: traductionText.flavor_text || traductionText.genus || "no entry",
                    language: { name: traductionText.language?.name, id: parseInt(traductionText.language.url.split("/").slice(-2)[0]) }
                } 
                : { text: "no entry", language: { name: "unknown", id: 0 } };
        };
        

        const colorFormat = {
            name: color.name,
            id: parseInt(color.url.split("/").slice(-2)[0])
        };

        return { color: colorFormat, evolId: parseInt(evolution_chain.url.split("/").slice(-2)[0]), description: changeText( flavor_text_entries), genera: changeText(genera), isEvolution, evolves_from: evolvesFrom() };
    } catch (error) {
        console.error("Error en pokeExtraInfo:", error);
        throw new Error("No se pudo obtener información adicional del Pokémon");
    }
};

const extractEvolutions = async (chain: any): Promise<Evolutions> => {
    const ids = [chain.species.url, ...chain.evolves_to.flatMap(evol => 
        [evol.species.url, ...evol.evolves_to.map(finalEvol => finalEvol.species.url)]
    )].map(url => parseInt(url.split("/").slice(-2)[0]));

    const spritesData = await Promise.all(ids.map(id => pokeBasicInfo(id)));

    const nextEvol = chain.evolves_to.map((evol, index) => ({
        name: evol.species.name,
        id: ids[index + 1],
        miniImg: spritesData[index + 1].sprites.miniImg,
        evol_level: evol.evolution_details[0]?.min_level || null
    }));

    const lastEvol = chain.evolves_to.flatMap(evol => 
        evol.evolves_to.map((finalEvol, index) => ({
            name: finalEvol.species.name,
            id: ids[nextEvol.length + index + 1],
            miniImg: spritesData[nextEvol.length + index + 1].sprites.miniImg,
            evol_level: finalEvol.evolution_details[0]?.min_level || null
        }))
    );

    return {
        id: ids[0],
        baseEvol: { name: chain.species.name, id: ids[0], miniImg: spritesData[0].sprites.miniImg },
        notEvolution: chain.evolves_to.length === 0,
        nextEvol,
        lastEvol: lastEvol.length > 0 ? lastEvol : undefined
    };
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
            console.warn(`No se pudo obtener información para el Pokémon: ${input}`);
            return null;
        }
        
        const evolutions = await pokeEvolutions(extraInfo.evolId);
        const { evolId, ...extraInfoFilter } = extraInfo

        return { ...basicInfo, ...extraInfoFilter, evolutions };
    } catch (error) {
        console.error("Error en pokeInfo:", error);
        return null;
    }
};