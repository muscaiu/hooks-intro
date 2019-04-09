import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedCharacter, setLoadedCharacter] = useState({});

  console.log('checking shouldComponentUpdate... replaced by React.memo')

  const fetchData = () => {
    setIsLoading(true)
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false)
        setLoadedCharacter(loadedCharacter)
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    console.log('fetching data')
    fetchData();
    return () => {
      console.log('cleanup')
    }
  }, [props.selectedChar]) //it will run when props.selectedChar runs

  useEffect(() => {
    return () => { //the returned function runs when the component unmounts
      console.log('component will unmount')
    }
  }, [])

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;

}

export default React.memo(Character, (prevProps, nextProps) => {
  return (
    //this is redundant because React manages automatically with memo, but keep in mind
    nextProps.selectedChar === prevProps.selectedChar
  );
}); //React.memo replaces shouldComponentUpdate and can be passed a function to decide if to update
