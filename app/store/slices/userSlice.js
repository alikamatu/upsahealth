// app/store/slices/userSlice.js
const initialState = {
  user: null,
  notifications: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
