import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonResponse, PokemonDetailsData, PokemonMove } from "../types/types";

interface PokemonState {
  list: PokemonResponse["results"];
  nextUrl: string | null;
  selectedPokemon: string | null;
  pokemonDetails: PokemonDetailsData | null;
  isModalOpen: boolean;
  filteredMoves: PokemonMove[];
  detailsCache: Record<string, PokemonDetailsData>;
}

const initialState: PokemonState = {
  list: [],
  nextUrl: null,
  selectedPokemon: null,
  pokemonDetails: null,
  isModalOpen: false,
  filteredMoves: [],
  detailsCache: {},
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList(state, action: PayloadAction<PokemonResponse["results"]>) {
      const newPokemon = action.payload.filter(
        (pokemon) => !state.list.some((p) => p.name === pokemon.name)
      );
      state.list = [...state.list, ...newPokemon];
    },
    setNextUrl(state, action: PayloadAction<string | null>) {
      state.nextUrl = action.payload;
    },
    setSelectedPokemon(state, action: PayloadAction<string | null>) {
      state.selectedPokemon = action.payload;
      state.isModalOpen = action.payload !== null;
    },
    setPokemonDetails(state, action: PayloadAction<PokemonDetailsData | null>) {
      if (action.payload) {
        state.detailsCache[action.payload.name] = action.payload;
      }
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
    fetchDetailsFromCache(state, action: PayloadAction<string>) {
      const cachedDetails = state.detailsCache[action.payload];
      state.pokemonDetails = cachedDetails || null;
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
  fetchDetailsFromCache, // Export the new action
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
