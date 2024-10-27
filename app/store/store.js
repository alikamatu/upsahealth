// app/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootReducer';

const store = configureStore({
  reducer: rootReducer, // Use the root reducer here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Optional, but allows for adding custom middleware
});

export default store;
