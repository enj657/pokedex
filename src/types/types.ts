export interface Pokemon {
  name: string;
  url: string;
}
  
export interface PokemonResponse {
  results: { name: string; url: string }[];
  next?: string;
}

  
export interface Ability {
  ability: {
    name: string;
  };
}

export interface PokemonDetailsData {
  name: string;
  abilities: Ability[];
  id: number;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string;
  };
  moves: {
    move: { name: string };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: { name: string };
      version_group: { name: string };
    }[];
  }[];
}

export const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

export interface PokemonModalProps {
  url: string;
  onClose: () => void;
}