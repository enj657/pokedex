import { PokemonResponse, PokemonDetailsData } from "../types/types";

export async function fetchPokemon(url?: string): Promise<PokemonResponse> {
  const apiUrl = url || "https://pokeapi.co/api/v2/pokemon?limit=21";
  const response = await fetch(apiUrl);

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
