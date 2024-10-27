// store/actions/userActions.js
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const addNotification = (notification) => ({
    type: 'ADD_NOTIFICATION',
    payload: notification,
  });
  
  export const removeNotification = (index) => ({
    type: 'REMOVE_NOTIFICATION',
    payload: index,
  });
  