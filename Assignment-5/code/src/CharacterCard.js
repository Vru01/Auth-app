import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharacterCard.css';

const speciesColors = {
  'Human': '#FFD700',
  'Droid': '#8B8B8B',
  'Wookiee': '#8B4513',
  'Twi\'lek': '#9370DB',
  'default': '#ADD8E6'
};

const CharacterCard = ({ character, onClick }) => {
  const [species, setSpecies] = useState('Unknown');

  useEffect(() => {
    const fetchSpecies = async () => {
      if (character.species.length > 0) {
        try {
          const response = await axios.get(character.species[0]);
          setSpecies(response.data.name);
        } catch (err) {
          setSpecies('Unknown');
        }
      }
    };
    fetchSpecies();
  }, [character.species]);

  const speciesColor = speciesColors[species] || speciesColors['default'];
  const randomImageUrl = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="character-card" onClick={onClick} style={{ backgroundColor: speciesColor }}>
      <img src={randomImageUrl} alt={character.name} />
      <h2>{character.name}</h2>
      <p>{species}</p>
    </div>
  );
};

export default CharacterCard;
