

interface PokemonSprites {
    fullImg: string | null;
    miniImg: string | null;
    other: string | null;
}
interface PokemonText {
    text: string;
    language: { name: string, id: number }
}
export interface PokemonStat {
    base_stat: number;
    name: string;
    id: number;
}

export interface PokemonAbility {
    name: string;
    id: number;
    slot: number;
}
export interface PokemonType {
    name: string;
    id: number;
    slot: number;
    icon: string
}
interface PokemonGenera {
    text: string;
    language: { name: string, id: number };
}
interface PokemonColor {
    name: string;
    id: number;
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
    }[];
    genera: {
        genus: string;
        language: { name: string, url: string };
    }[];
}

// Tipado de la respuesta de "evolution-chain"
export interface EvolutionChain {
    chain: {
        species: { name: string; url: string };
        evolves_to: {
            species: { name: string; url: string };
            evolves_to: {
                species: { name: string; url: string };
                evolves_to?: {
                    species: { name: string; url: string };
                }[];
            }[];
        }[];
    };
}

// Tipado de la estructura de evoluciones
export interface Evolutions {
    notEvolution: boolean;
    id: number | string;
    nextEvol?: {
        name: string;
        id: number;
        miniImg: string;
        evol_level?: number;
    };
    lastEvol?: {
        name: string;
        id: number;
        miniImg: string;
        evol_level?: number;
    };
    baseEvol?: {
        name: string;
        id: number;
        miniImg: string;
    } | null;
}


export interface Pokemon {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    types: PokemonType[];
    color: PokemonColor;
    evolutions: Evolutions;
    description: PokemonText;
    genera: PokemonGenera;
}

export interface PokemonState {
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}