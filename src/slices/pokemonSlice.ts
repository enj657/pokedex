import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonResponse, PokemonDetailsData } from "../types/types";

interface PokemonState {
  list: PokemonResponse["results"];
  nextUrl: string | null;
  selectedPokemon: string | null;
  pokemonDetails: PokemonDetailsData | null;
  isModalOpen: boolean;
}

const initialState: PokemonState = {
  list: [],
  nextUrl: null,
  selectedPokemon: null,
  pokemonDetails: null,
  isModalOpen: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList(state, action: PayloadAction<PokemonResponse["results"]>) {
      state.list = [...state.list, ...action.payload]; // Append new Pokémon
    },
    setNextUrl(state, action: PayloadAction<string | null>) {
      state.nextUrl = action.payload;
    },
    setSelectedPokemon(state, action: PayloadAction<string | null>) {
      state.selectedPokemon = action.payload;
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
  setPokemonList,
  setNextUrl,
  setSelectedPokemon,
  setPokemonDetails,
  setIsModalOpen,
  closeModal,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
