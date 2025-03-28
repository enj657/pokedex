import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeModal } from "../slices/pokemonSlice";
import { typeColors, PokemonModalProps } from "../types/types";

const adjustBrightness = (hex: string, percent: number) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  const factor = 1 - percent / 20;
  r = Math.floor(r * factor);
  g = Math.floor(g * factor);
  b = Math.floor(b * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

const PokemonModal: React.FC<PokemonModalProps> = ({ url, onClose }) => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state: RootState) => state.pokemon.selectedPokemon);
  const pokemonDetails = useSelector((state: RootState) => state.pokemon.pokemonDetails);

  if (!selectedPokemon || !pokemonDetails) return null;

  const primaryType = pokemonDetails?.types[0]?.type.name;
  const secondaryType = pokemonDetails?.types[1]?.type.name || null;

  const baseColor = typeColors[primaryType] || "#A8A77A";
  const secondaryColor = secondaryType
    ? typeColors[secondaryType]
    : adjustBrightness(baseColor, 5);

  const modalStyle = {
    background: `linear-gradient(135deg, ${baseColor} 30%, ${secondaryColor} 70%)`,
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-border">
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <span className="close-btn" onClick={handleClose}>
            &times;
          </span> */}
          <div className="modal-header-row">
            <h2>{pokemonDetails?.name}</h2>
            <h3><span className="hp-display">HP </span>{pokemonDetails?.stats.find(stat => stat.stat.name === "hp")?.base_stat}</h3>
          </div>
          <div 
              style={modalStyle}
              className="modal-image-container">
            <img
              src={pokemonDetails?.sprites.front_default}
              alt={pokemonDetails?.name}
              className="modal-image"
            />
            <div className="modal-height-weight">
              <p>NO: {pokemonDetails?.id}</p>
              <p>Ht: {pokemonDetails?.height / 10} m</p>
              <p>Wt: {pokemonDetails?.weight / 10} kg</p>
            </div>
          </div>
          <div className="modal-text-container">
            
            <ul className="modal-flex-list">
            {pokemonDetails?.stats
              .filter(stat => stat.stat.name !== "hp")
              .map((stat, index) => (
                <li key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <h3>Types</h3>
            <ul>
              {pokemonDetails?.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
            <h3>Abilities</h3>
            <ul>
              {pokemonDetails?.abilities.map((abilityObj, index) => (
                <li key={index}>{abilityObj.ability.name}</li>
              ))}
            </ul>
            {/* <p># {pokemonDetails?.id}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
