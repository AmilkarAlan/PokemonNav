import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokeBasicInfo, pokemonExtraInfo } from "../utils/pokemonUtils";
import { PokemonState } from "../utils/types";


const initialState: PokemonState = {
    pokemon: null,
    loading: false,
    error: null
};

//accion para obtener datos

export const fetchPokeData = createAsyncThunk("pokemon/fetchPokeData",
    async (input: string | number) => {
        // const pokeData = await pokeBasicInfo(input);
        const pokeData = await pokemonExtraInfo(input)
        console.log(pokeData);
        return pokeData
    }
)

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPokeData.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemon = action.payload;
            })
            .addCase(fetchPokeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

// export const {} = pokemonSlice.actions;
export default pokemonSlice.reducer;
