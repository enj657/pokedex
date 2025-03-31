import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/api";
import { PokemonDetailsData } from "../types/types";

interface PokemonCardProps {
  url: string;
  onClick: (data: PokemonDetailsData) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ url, onClick }) => {
  const { data, isLoading, error } = useQuery<PokemonDetailsData>({
    queryKey: ["pokemon-details", url],
    queryFn: () => fetchPokemonDetails(url),
  });

  if (isLoading) return 
  <div className="pokemon-card">
    <div className="pokemon-card-header">
      <h2>Loading...</h2>
    </div>
    <img src="9.svg" alt="Pokemon Ball" />
  </div>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="pokemon-card" onClick={() => onClick(data!)}>
      <div className="pokemon-card-header">
        <h2>{data?.name}</h2>
      </div>
      {/* <img src={data?.sprites?.front_default} alt={data?.name} /> */}
      <img className="pokemon-card-image" src="9.svg" alt="Pokemon Ball" />
    </div>
  );
};

export default PokemonCard;
