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

export interface PokemonModalProps {
  url: string;
  onClose: () => void;
}