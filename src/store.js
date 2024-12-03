// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import usersReducer from './features/userSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    theme: themeReducer
  }
});