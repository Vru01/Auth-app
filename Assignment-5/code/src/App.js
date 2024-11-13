import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      setCharacters(response.data.results);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const charactersPerPage = 3;
  const indexOfLastCharacter = page * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  return (
    <div className="app-container">
      <h1>Star Wars Characters</h1>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="character-grid">
        {currentCharacters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            onClick={() => {
              setSelectedCharacter(character);
              setShowModal(true);
            }}
          />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {showModal && selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;