import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './CharacterModal.css';

const CharacterModal = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      const response = await axios.get(character.homeworld);
      setHomeworld(response.data);
    };
    fetchHomeworld();
  }, [character]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} className="modal-content">
      <h2>{character.name}</h2>
      <p>Height: {character.height / 100} m</p>
      <p>Mass: {character.mass} kg</p>
      <p>Date Added: {formatDate(character.created)}</p>
      <p>Films: {character.films.length}</p>
      <p>Birth Year: {character.birth_year}</p>
      {homeworld && (
        <>
          <h3>Homeworld Information</h3>
          <p>Name: {homeworld.name}</p>
          <p>Terrain: {homeworld.terrain}</p>
          <p>Climate: {homeworld.climate}</p>
          <p>Residents: {homeworld.population}</p>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default CharacterModal;
