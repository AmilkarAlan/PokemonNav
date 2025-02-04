import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice"; // Importaremos el slice después

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer, // Agregamos el slice aquí
  },
});

// Definimos tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;