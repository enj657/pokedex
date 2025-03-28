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

  if (isLoading) return <div className="pokemon-card">Loading...</div>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="pokemon-card" onClick={() => onClick(data!)}> {/* Pass data here */}
      <h2>{data?.name}</h2>
      <img src={data?.sprites?.front_default} alt={data?.name} />
    </div>
  );
};

export default PokemonCard;
