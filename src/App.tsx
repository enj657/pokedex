import React from 'react';
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "./api/api";
import { PokemonResponse } from "./types/types";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPokemon, setIsModalOpen } from './slices/pokemonSlice';
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const { selectedPokemon, isModalOpen } = useSelector((state: RootState) => state.pokemon);

  const { isLoading, error, data } = useQuery<PokemonResponse>({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const openModal = (pokemonUrl: string) => {
    dispatch(setSelectedPokemon(pokemonUrl));
    dispatch(setIsModalOpen(true));
  };

  const closeModal = () => {
    dispatch(setSelectedPokemon(null));
    dispatch(setIsModalOpen(false));
  };

  return (
    <>
      <div className="pokedex">
        <h1 className="title">Pokedex</h1>
        <div className="pokemon-grid">
          {data?.results.map((pokemon, index) => (
            <PokemonCard key={index} url={pokemon.url} onClick={() => openModal(pokemon.url)} />
          ))}
        </div>
      </div>

      {isModalOpen && selectedPokemon && <PokemonModal url={selectedPokemon} onClose={closeModal} />}
    </>
  );
}

export default App;
