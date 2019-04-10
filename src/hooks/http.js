import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log('fetching data from', url)
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchData(data);
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err);
      });
  }, dependencies) // useEffect with empty array is equivalent to cdm

  // fetch('https://swapi.co/api/people')


  return [isLoading, fetchedData];
};
