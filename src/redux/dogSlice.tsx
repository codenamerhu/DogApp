import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../ultils/constants';

// Dog state type
interface DogState {
  items: string[];
  loading: boolean;
  error: string | null;
}

// Async action to fetch random dog images using the Dog CEO API
export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async (): Promise<string[]> => {
  const response = await axios.get(API_BASE_URL+'/breeds/image/random/20');
  return response.data.message; // Returning the array of image URLs
});

// Redux slice to manage the state of dog images
const dogSlice = createSlice({
  name: 'dogs',
  initialState: { items: [], loading: false, error: null } as DogState, // Initial state with type annotation
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogs.pending, (state) => { state.loading = true; }) // Set loading state when fetching starts
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false once data is successfully fetched
        state.items = action.payload; // Store the fetched dog images
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dogs'; // Handle any errors that occur during fetching
      });
  },
});

export default dogSlice.reducer;