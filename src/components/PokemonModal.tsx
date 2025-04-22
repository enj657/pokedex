import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeModal } from "../slices/pokemonSlice";
import {
  typeColors,
  PokemonModalProps,
  PokemonDetailsData,
} from "../types/types";
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

  const [filteredMoves, setFilteredMoves] = useState<any[]>([]);

  useEffect(() => {
    if (!pokemonDetails) return;

    const pokemonTypes = pokemonDetails.types.map((type) => type.type.name);

    let movesToDisplay: any[] = [];

    if (pokemonTypes.length === 1) {
      movesToDisplay = pokemonDetails.moves
        .filter((move) => move.type === pokemonTypes[0])
        .slice(0, 2);
    } else if (pokemonTypes.length === 2) {
      const firstTypeMoves = pokemonDetails.moves
        .filter((move) => move.type === pokemonTypes[0])
        .slice(0, 1);

      const secondTypeMoves = pokemonDetails.moves
        .filter((move) => move.type === pokemonTypes[1])
        .slice(0, 1);

      movesToDisplay = [...firstTypeMoves, ...secondTypeMoves];

      if (movesToDisplay.length < 2) {
        const remainingMoves = pokemonDetails.moves.filter(
          (move) => !movesToDisplay.includes(move)
        );
        movesToDisplay = [
          ...movesToDisplay,
          ...remainingMoves.slice(0, 2 - movesToDisplay.length),
        ];
      }
    }

    setFilteredMoves(movesToDisplay);
  }, [pokemonDetails]);

  if (!selectedPokemon || !pokemonDetails) return null;

  const primaryType = pokemonDetails?.types[0]?.type.name;
  const secondaryType = pokemonDetails?.types[1]?.type.name || null;

  const baseColor = typeColors[primaryType] || "#A8A77A";
  const secondaryColor = secondaryType
    ? typeColors[secondaryType]
    : adjustLightnessLarge(baseColor, 20);

  const luminance = getLuminance(baseColor);
  const isDark = luminance < 0.35;

  const modalStyle = {
    background: `linear-gradient(${baseColor}, transparent), linear-gradient(to top left,${secondaryColor}, transparent), linear-gradient(to top right, black, transparent)`,
  };

  const modalContentStyle = {
    backgroundColor: baseColor,
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
  };

  const handleClose = () => {
    dispatch(closeModal());
    if (onClose) onClose();
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
            {pokemonDetails?.sprites.front_default ? (
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
                className="modal-image"
              />
            ) : (
              <div className="modal-image-placeholder">No Image</div>
            )}
            <div className="modal-height-weight">
              <p>No: {pokemonDetails?.id}</p>
              <p>Ht: {pokemonDetails?.height / 10} m</p>
              <p>Wt: {pokemonDetails?.weight / 10} kg</p>
            </div>
          </div>
          <div className="modal-text-container">
            <ul className="modal-moves-list">
              {filteredMoves?.map((move, index) => (
                <li
                  key={index}
                  className="modal-move-item"
                  style={{ color: textColor }}
                >
                  <div className="modal-move-left-content">
                    <span className={`modal-move-type ${move.type}`}></span>
                  </div>
                  <div className="modal-move-right-content">
                    <span className="modal-move-name">{move.name}</span>
                    <span className="modal-move-power">
                      {move.power || "—"}
                    </span>
                  </div>
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
