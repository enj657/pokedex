// Basic Pokémon Data
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

// API Response Structures
export interface PokemonResponse {
  results: Pokemon[];
  next?: string;
}

// Detailed Pokémon Data
export interface Ability {
  ability: {
    name: string;
  };
}

export interface PokemonMove {
  name: string;
  type: string;
  power: string | number;
}

export interface PokemonDetailsData {
  name: string;
  abilities: Ability[];
  id: number;
  url: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string;
  };
  moves: {
    type: string; move: { name: string; url: string } 
}[];
}

export interface MoveDetails {
  name: string;
  type: { name: string };
  power: number | null;
  accuracy: number | null;
  pp: number;
}

// Component Props
export interface PokemonCardProps {
  url: string;
  onClick: (pokemon: PokemonDetailsData) => void;
}

export interface PokemonModalProps {
  url: string;
  onClose: () => void;
}

// Constants
export const typeColors = {
  normal: "#a5a478",
  fire: "#fb7c1b",
  water: "#5086f9",
  electric: "#fed639",
  grass: "#71d338",
  ice: "#99e6e2",
  fighting: "#ae2626",
  poison: "#b61bb3",
  ground: "#daa556",
  flying: "#ab92f0",
  psychic: "#ef3c71",
  bug: "#c2d81a",
  rock: "#8e500e",
  ghost: "#553085",
  dragon: "#6F35FC",
  dark: "#263c2f",
  steel: "#939397",
  fairy: "#d96aa2",
};