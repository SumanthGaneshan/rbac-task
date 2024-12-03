import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialUsers } from '../model/UserModel';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, getState }) => {
    return new Promise((resolve, reject) => {
      // simulating api call
      setTimeout(() => {

        const allUsers = getState().users.allUsers;
        const user = allUsers.find(u => u.email === credentials.username);

        // Check if user exists
        if (!user) {
          return reject(rejectWithValue({
            statusCode: 403,
            message: 'User not found',
          }));
        }

        // Check if user has admin/super_admin role
        if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
          return reject(rejectWithValue({
            statusCode: 401,
            message: 'Only admin or super admin can log in',
          }));
        }

        if (credentials.password !== 'admin123') {
          return reject(rejectWithValue({
            statusCode: 401,
            message: 'Invalid password',
          }));
        }

        resolve({
          statusCode: 200,
          data: {
            user,
          },
        });
      }, 1000);
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