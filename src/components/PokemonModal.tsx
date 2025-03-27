import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeModal } from "../slices/pokemonSlice";
import { typeColors } from "../types/types";

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

const PokemonModal: React.FC = () => {
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
    background: `linear-gradient(135deg, ${baseColor} 20%, ${secondaryColor} 45%)`,
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-border">
        <div
          className="modal-content"
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
          <div className="modal-image-container">
            <img
              src={pokemonDetails?.sprites.front_default}
              alt={pokemonDetails?.name}
              className="modal-image"
            />
            <div className="modal-height-weight">
              <p>Ht: {pokemonDetails?.height / 10} m</p>
              <p>Wt: {pokemonDetails?.weight / 10} kg</p>
            </div>
          </div>
          <div className="modal-text-container">
            <h2>{pokemonDetails?.name}</h2>
            <ul>
              {pokemonDetails?.stats.map((stat, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
