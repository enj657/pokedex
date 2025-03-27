import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonDetailsData } from "../types/types";

interface PokemonState {
  selectedPokemon: string | null;
  pokemonDetails: PokemonDetailsData | null;
  isModalOpen: boolean;
}

const initialState: PokemonState = {
  selectedPokemon: null,
  pokemonDetails: null,
  isModalOpen: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon(state, action: PayloadAction<string | null>) {
      state.selectedPokemon = action.payload;
      // Open modal whenever a Pokémon is selected
      state.isModalOpen = action.payload !== null;
    },
    setPokemonDetails(state, action: PayloadAction<PokemonDetailsData | null>) {
      state.pokemonDetails = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    closeModal(state) {
      state.selectedPokemon = null;
      state.pokemonDetails = null;
      state.isModalOpen = false;
    },
  },
});

export const {
  setSelectedPokemon,
  setPokemonDetails,
  setIsModalOpen,
  closeModal,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
