import React from 'react';

import { useHttp } from '../hooks/http';
import './CharPicker.css';

const CharPicker = props => {
  //custom hooks must be called at the top level inside the main component
  //isLoading, fetchedData are returned by the useHttp hook
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people', [])

  const selectedCharacters = fetchedData && fetchedData.results
    .slice(0, 5)
    .map((char, index) => ({
      name: char.name,
      id: index + 1
    }))

  return (
    isLoading
      ? <p>Loading characters...</p>
      : selectedCharacters &&
      < select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {
          selectedCharacters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))
        }
      </select >

  )
}

export default CharPicker;
