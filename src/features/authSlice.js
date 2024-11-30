// redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated login API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock admin credentials
        if (
          credentials.username === 'admin' && 
          credentials.password === 'admin123'
        ) {
          resolve({
            statusCode: 200,
            data: {
              user: {
                username: 'admin',
                role: 'SUPER_ADMIN'
              },
              token: 'fake-jwt-token'
            }
          });
        } else {
          reject(rejectWithValue({
            statusCode: 401,
            message: 'Invalid credentials'
          }));
        }
      }, 1000); // Simulate network delay
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;