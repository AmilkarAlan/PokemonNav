

// export interface PokemonSprites {
//     front_default: string; 
//   }

interface PokemonStat {
    base_stat: number;
    stat: { name: string; url: string };
}

interface PokemonAbility {
    ability: { name: string; url: string };
}


// Tipado de la respuesta de "pokemon-species"
export interface PokemonSpecies {
    color: string;
    evolution_chain: {
        url: string;
    };
    evolves_from_species: string | null;
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
    firstEvol?: {
        name: string;
        id: number;
    };
    lastEvol?: {
        name: string;
        id: number;
    };
}

export interface Pokemon {
    id: number;
    name: string;
    sprites: Record<string, unknown>;
    stats: PokemonStat[];
    abilities: PokemonAbility[];
}

export interface PokemonState {
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}