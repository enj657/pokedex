import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, fetchPokemonDetails } from "../api/api";
import PokemonCard from "./PokemonCard";

const PokemonList: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => fetchPokemon(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="pokemon-list">
      {data.results.map((pokemon) => {
        const { data: pokemonDetails, isLoading: detailsLoading } = useQuery({
          queryKey: ["pokemon-details", pokemon.url],
          queryFn: () => fetchPokemonDetails(pokemon.url),
        });

        if (detailsLoading) return <p key={pokemon.url}>Loading...</p>;
        if (!pokemonDetails) return null;

        return <PokemonCard key={pokemonDetails.name} pokemon={pokemonDetails} onClick={() => {}} />;
      })}
    </div>
  );
};

export default PokemonList;