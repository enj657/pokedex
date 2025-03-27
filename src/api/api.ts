import { PokemonResponse, PokemonDetailsData } from "../types/types";

export async function fetchPokemon(): Promise<PokemonResponse> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetailsData> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
