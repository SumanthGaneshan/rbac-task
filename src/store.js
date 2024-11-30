// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import usersReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer
  }
});