// app/store/slices/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userSlice'; // Adjust the path based on your structure

const rootReducer = combineReducers({
  user: userReducer,
  // Add more reducers here if needed
});

export default rootReducer;
