import React, { useEffect } from 'react';

import { useHttp } from '../hooks/http';
import Summary from './Summary';

const Character = props => {
  //custom hooks must be called at the top level inside the main component
  //isLoading, fetchedData are returned by the useHttp hook
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar])

  const loadedCharacter = fetchedData && {
    id: props.selectedChar,
    name: fetchedData.name,
    height: fetchedData.height,
    colors: {
      hair: fetchedData.hair_color,
      skin: fetchedData.skin_color
    },
    gender: fetchedData.gender,
    movieCount: fetchedData.films.length
  }

  useEffect(() => { //used as comonenetDidUnmount
    return () => { //the returned function runs when the component unmounts
      console.log('component will unmount')
    }
  }, [])

  return (
    isLoading
      ? <p>Loading Character...</p>
      : loadedCharacter &&
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
  )
}

export default React.memo(Character, (prevProps, nextProps) => {
  return (
    //this is redundant because React manages automatically with memo, but keep in mind
    nextProps.selectedChar === prevProps.selectedChar
  );
}); //React.memo replaces shouldComponentUpdate and can be passed a function to decide if to update
