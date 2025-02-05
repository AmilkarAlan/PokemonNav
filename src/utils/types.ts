

// export interface PokemonSprites {
//     front_default: string; 
//   }

interface PokemonStat {
    base_stat: number;
    stat: { name: string; id: number };
}

interface PokemonAbility {
    ability: { name: string; id: number };
}

interface PokemonColor {
    color: { name: string, id: number};
}
// Tipado de la respuesta de "pokemon-species"
export interface PokemonSpecies {
    color: { name: string, url: string };
    evolution_chain: {
        url: string;
    };
    evolves_from_species: { name: string, id: number } | null;
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
    sprites: Record<string, unknown>;
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    color: PokemonColor;
    evolutions: Evolutions;
}

export interface PokemonState {
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}