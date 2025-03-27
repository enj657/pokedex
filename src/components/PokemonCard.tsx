import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/api";
import { PokemonDetailsData } from "../types/types";
import { useDispatch } from "react-redux";
import { setSelectedPokemon, setPokemonDetails } from "../slices/pokemonSlice";

interface PokemonCardProps {
  url: string;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ url, onClick }) => {
  const dispatch = useDispatch();
  
  const { isLoading, error, data } = useQuery<PokemonDetailsData>({
    queryKey: [url],
    queryFn: () => fetchPokemonDetails(url),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const handleCardClick = () => {
    if (data) {
      dispatch(setSelectedPokemon(url));
      dispatch(setPokemonDetails(data));
      onClick();
    }
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <h2>{data?.name}</h2>
      <img src={data?.sprites.front_default} alt={data?.name} className="pokemon-image" />
    </div>
  );
};

export default PokemonCard;
