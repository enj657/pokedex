import React, { useEffect, useRef } from "react";
import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPokemon } from "./api/api";
import { PokemonResponse } from "./types/types";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList, setNextUrl, setSelectedPokemon, setIsModalOpen } from "./slices/pokemonSlice";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state: RootState) => state.pokemon.list);
  const nextUrl = useSelector((state: RootState) => state.pokemon.nextUrl);
  const selectedPokemon = useSelector((state: RootState) => state.pokemon.selectedPokemon);
  const isModalOpen = useSelector((state: RootState) => state.pokemon.isModalOpen);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, error, isLoading } = useQuery<PokemonResponse>({
    queryKey: ["pokemon"],
    queryFn: () => fetchPokemon(),
  });

  useEffect(() => {
    if (data) {
      dispatch(setPokemonList(data.results));
      dispatch(setNextUrl(data.next ?? null));
    }
  }, [data, dispatch]);

  const mutation = useMutation({
    mutationFn: (url: string) => fetchPokemon(url),
    onSuccess: (data) => {
      dispatch(setPokemonList(data.results));
      dispatch(setNextUrl(data.next || null));
    },
  });
  
  const loadMore = (url: string) => mutation.mutate(url);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          loadMore(nextUrl);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [nextUrl, loadMore]);

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
          {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} url={pokemon.url} onClick={() => openModal(pokemon.url)} />
          ))}
        </div>
        {nextUrl && <div ref={loaderRef} style={{ height: 50, textAlign: "center" }}>Loading more...</div>}
      </div>

      {isModalOpen && selectedPokemon && <PokemonModal url={selectedPokemon} onClose={closeModal} />}
    </>
  );
}

export default App;
