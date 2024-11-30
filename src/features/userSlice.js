// redux/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User,initialUsers } from '../model/UserModel';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          statusCode: 200,
          data: initialUsers
        });
      }, 500);
    });
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = new User(
          Date.now(), 
          userData.username, 
          userData.email, 
          userData.role
        );
        resolve({
          statusCode: 201,
          data: newUser
        });
      }, 500);
    });
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          statusCode: 200,
          data: userData
        });
      }, 500);
    });
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          statusCode: 200,
          data: { id: userId }
        });
      }, 500);
    });
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          user => user.id === action.payload.data.id
        );
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          user => user.id !== action.payload.data.id
        );
      });
  }
});

export default usersSlice.reducer;