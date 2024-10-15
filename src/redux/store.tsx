import { configureStore } from '@reduxjs/toolkit';
import dogReducer from './dogSlice';

// Configuring Redux store with dogReducer to manage the dog-related state
const store = configureStore({
  reducer: { dogs: dogReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;