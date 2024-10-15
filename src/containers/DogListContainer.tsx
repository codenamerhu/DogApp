import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs } from '../redux/dogSlice';
import { RootState, AppDispatch } from '../redux/store';

import DogListPresenter from '../presenters/DogListPresenter';
import { DogData } from '../types/dogData';

// Component to display the list of dogs fetched from the Dog CEO API
const DogListScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch hook
  const { items, loading, error } = useSelector((state: RootState) => state.dogs); // Typed selector hook

  const [dogData, setDogData] = useState<DogData[]>([]); // Explicitly set DogData type
  const [filteredDogData, setFilteredDogData] = useState<DogData[]>(dogData); // Store filtered dog data
  const [search, setSearch] = useState(''); // State for managing search input

  useEffect(() => {
    dispatch(fetchDogs()); // Fetch dog images when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      const parsedDogData = items.map((url: string): DogData => {
        const breed = url.split('/')[4]; // Extract breed from the URL
        const height = Math.floor(Math.random() * 100) + 200; // Random height between 200-300 for a Pinterest effect
        return { breed, imageUrl: url, height };
      });

      // Sort the parsed data by breed name (A-Z)
      const sortedDogData = parsedDogData.sort((a, b) =>
        a.breed.localeCompare(b.breed)
      );

      setDogData(sortedDogData);
      setFilteredDogData(sortedDogData); // Initially, filtered data is the same as dog data
    }
  }, [items]);
  

  useEffect(() => {
    // Filter the dog data when the search text changes
    if (search) {
      const filteredData = dogData.filter((item) =>
        item.breed.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredDogData(filteredData);
    } else {
      setFilteredDogData(dogData); // Reset to all data if search is cleared
    }
  }, [search, dogData]);

  return (
    <DogListPresenter
      filteredDogData={filteredDogData}
      search={search}
      setSearch={setSearch}
      loading={loading}
      error={error}
    />
  
  );
};

export default DogListScreen;
