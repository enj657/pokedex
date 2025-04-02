import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api/api";
import PokemonCard from "./PokemonCard";
import { PokemonListItem, PokemonResponse } from "../types/types";

const PokemonList: React.FC = () => {
  const { data, isLoading, error } = useQuery<PokemonResponse>({
    queryKey: ["pokemon-list"],
    queryFn: () => fetchPokemon(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="pokemon-list">
      {data.results?.map((pokemon: PokemonListItem) => (
        <PokemonCard key={pokemon.name} url={pokemon.url} onClick={() => {}} />
      ))}
    </div>
  );
};

export default PokemonList;
