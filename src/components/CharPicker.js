import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const CharPicker = props => {
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect replace cdm but it runs on every update')
    setIsLoading(true)
    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        setLoadedChars(selectedCharacters.map((char, index) => ({
          name: char.name,
          id: index + 1
        }))
        )
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err);
      });
  }, []) // useEffect with empty array is equivalent to cdm

  let content = <p>Loading characters...</p>;

  if (
    !isLoading &&
    loadedChars &&
    loadedChars.length > 0
  ) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedChars.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!loadedChars || loadedChars.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;
