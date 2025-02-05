

interface PokemonSprites {
    fullImg: string | null;
    miniImg: string | null;
    other: string | null;
}
interface PokemonText {
    flavor_text: string;
    language: { name: string, id: number }
}
interface PokemonStat {
    base_stat: number;
    stat: { name: string; id: number };
}

interface PokemonAbility {
    ability: { name: string; id: number };
    slot: number;
}
interface PokemonType {
    type: { name: string; id: number };
    slot: number;
}

interface PokemonColor {
    color: { name: string, id: number };
}
// Tipado de la respuesta de "pokemon-species"
export interface PokemonSpecies {
    color: { name: string, url: string };
    evolution_chain: {
        url: string;
    };
    evolves_from_species: { name: string, id: number } | null;
    flavor_text_entries: {
        flavor_text: string;
        language: { name: string, url: string }
    }
}

// Tipado de la respuesta de "evolution-chain"
export interface EvolutionChain {
    chain: {
        evolves_to: {
            species: {
                name: string;
                url: string;
            };
            evolves_to?: {
                species: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
    };
}

// Tipado de la estructura de evoluciones
export interface Evolutions {
    notEvolution?: boolean;
    id: number | string;
    nextEvol?: {
        name: string;
        id: number;
    };
    lastEvol?: {
        name: string;
        id: number;
    };
    baseEvol?: {
        name: string;
        id: number;
    } | null;
}

export interface Pokemon {
    id: number;
    name: string;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    types: PokemonType[];
    color: PokemonColor;
    evolutions: Evolutions;
    description: PokemonText[];

}

export interface PokemonState {
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}