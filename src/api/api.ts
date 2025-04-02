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

  const pokemonData = await response.json();

  const moveDetails = await Promise.all(
    pokemonData.moves.map(async (moveEntry: { move: { url: string } }) => {
      const moveResponse = await fetch(moveEntry.move.url);
      if (!moveResponse.ok) {
        throw new Error(`Error fetching move: ${moveResponse.status} ${moveResponse.statusText}`);
      }

      const moveData = await moveResponse.json();

      const power = moveData.power !== null && moveData.power !== undefined
        ? moveData.power
        : "—";

      return {
        name: moveData.name,
        type: moveData.type.name,
        power: power,
      };
    })
  );

  return {
    ...pokemonData,
    moves: moveDetails,
  };
}
