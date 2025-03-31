import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeModal } from "../slices/pokemonSlice";
import { typeColors, PokemonModalProps } from "../types/types";
import {
  adjustLightnessLarge,
  adjustLightnessSmall,
  getLuminance,
} from "../utils/colorUtils";

const PokemonModal: React.FC<PokemonModalProps> = ({ url, onClose }) => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );
  const pokemonDetails = useSelector(
    (state: RootState) => state.pokemon.pokemonDetails
  );

  if (!selectedPokemon || !pokemonDetails) return null;

  const primaryType = pokemonDetails?.types[0]?.type.name;
  const secondaryType = pokemonDetails?.types[1]?.type.name || null;

  const baseColor = typeColors[primaryType] || "#A8A77A";
  const secondaryColor = secondaryType
    ? typeColors[secondaryType]
    : adjustLightnessLarge(baseColor, 5);

  const luminance = getLuminance(baseColor);
  const isDark = luminance < 0.35;

  const modalStyle = {
    background: `linear-gradient(135deg, ${baseColor} 30%, ${secondaryColor} 70%)`,
  };

  const modalContentStyle = {
    backgroundImage: `
      linear-gradient(42deg, ${adjustLightnessLarge(
        baseColor,
        isDark ? 1 : 10
      )} 15%, ${adjustLightnessLarge(
      baseColor,
      isDark ? 1 : -1
    )} 28%, rgba(0,0,0,0.1) 37%, ${adjustLightnessLarge(
      baseColor,
      isDark ? -2 : 25
    )} 44%, ${adjustLightnessLarge(
      baseColor,
      isDark ? 5 : -5
    )} 63%, rgba(0,0,0,0.1) 73%, ${adjustLightnessLarge(
      baseColor,
      isDark ? -5 : -15
    )} 84%, ${adjustLightnessLarge(
      baseColor,
      isDark ? 12 : 25
    )} 96%, rgba(0, 0, 0, 0.1) 100%),
      linear-gradient(324deg, ${adjustLightnessLarge(
        baseColor,
        isDark ? 8 : -8
      )} 19%, rgba(255,255,255,0.1) 28%, ${adjustLightnessLarge(
      baseColor,
      isDark ? -3 : -10
    )} 40%, ${adjustLightnessLarge(
      baseColor,
      isDark ? 8 : -8
    )} 68%, rgba(255,255,255,0.1) 75%, ${adjustLightnessLarge(
      baseColor,
      isDark ? -3 : 10
    )} 89%, ${adjustLightnessLarge(
      baseColor,
      isDark ? 8 : -8
    )} 92%, rgba(255,255,255,0.1) 100%)
    `,
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const textColor = isDark ? "white" : "black";

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-border">
        <div
          className="modal-content"
          style={modalContentStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header-row">
            <h2 style={{ color: textColor }}>{pokemonDetails?.name}</h2>
            <h3 style={{ color: textColor }}>
              <span className="hp-display">HP </span>
              {
                pokemonDetails?.stats.find((stat) => stat.stat.name === "hp")
                  ?.base_stat
              }
            </h3>
          </div>
          <div style={modalStyle} className="modal-image-container">
            <img
              src={pokemonDetails?.sprites.front_default}
              alt={pokemonDetails?.name}
              className="modal-image"
            />
            <div className="modal-height-weight">
              <p>No: {pokemonDetails?.id}</p>
              <p>
                Ht: {pokemonDetails?.height / 10} m
              </p>
              <p>
                Wt: {pokemonDetails?.weight / 10} kg
              </p>
            </div>
          </div>
          <div className="modal-text-container">
            <ul className="modal-flex-list">
              {pokemonDetails?.stats
                .filter((stat) => stat.stat.name !== "hp")
                .map((stat, index) => (
                  <li key={index} style={{ color: textColor }}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
            </ul>
            <h3 style={{ color: textColor }}>Types</h3>
            <ul>
              {pokemonDetails?.types.map((type, index) => (
                <li key={index} style={{ color: textColor }}>
                  {type.type.name}
                </li>
              ))}
            </ul>
            <h3 style={{ color: textColor }}>Abilities</h3>
            <ul>
              {pokemonDetails?.abilities.map((abilityObj, index) => (
                <li key={index} style={{ color: textColor }}>
                  {abilityObj.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
