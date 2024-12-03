import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User,initialUsers } from '../model/UserModel';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, limit = 15, searchTerm = '',statusFilter = ''}, { getState }) => {
    const fullUserList = getState().users.allUsers;

    const loggedInUser = getState().auth.user;

    const filteredUsers = fullUserList.filter(
      user => 
        user.id !== loggedInUser?.id && 
        user.role !== 'SUPER_ADMIN' && 
        (statusFilter ? user.status === statusFilter : true) &&
        (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
         user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    console.log("search users",filteredUsers)

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
    };
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

export const changeUserStatus = createAsyncThunk(
  'users/changeUserStatus',
  async ({ userId, newStatus }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          statusCode: 200,
          data: { id: userId, status: newStatus }
        });
      }, 500);
    });
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId, currentUser }, { rejectWithValue }) => {
    // Permission check
    console.log("permission check",currentUser);
    if (!currentUser.permissions.includes('delete')) {
      return rejectWithValue({
        message: 'Only Super Admin can perform delete',
        statusCode: 403
      });
    }

    return new Promise((resolve, reject) => {
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
    allUsers: initialUsers,
    users: [], 
    loading: false,
    error: null,
    total: initialUsers.length,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.paginatedUsers;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.allUsers.push(action.payload.data);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add user';
      })
      // update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
      
        const allUsersIndex = state.allUsers.findIndex((user) => user.id === updatedUser.id);
        if (allUsersIndex !== -1) {
          state.allUsers[allUsersIndex] = updatedUser;
        }
      
        const usersIndex = state.users.findIndex((user) => user.id === updatedUser.id);
        if (usersIndex !== -1) {
          state.users[usersIndex] = updatedUser;
        }
      
        state.error = null;
      })
      // change user status
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload.data;
        
        const allUsersIndex = state.allUsers.findIndex(user => user.id === id);
        if (allUsersIndex !== -1) {
          state.allUsers[allUsersIndex] = {
            ...state.allUsers[allUsersIndex],
            status
          };
        }
        
        const usersIndex = state.users.findIndex(user => user.id === id);
        if (usersIndex !== -1) {
          state.users[usersIndex] = {
            ...state.users[usersIndex],
            status
          };
        }

      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {

        state.allUsers = state.allUsers.filter(
          (user) => user.id !== action.payload.data.id
        );
      
        state.users = state.users.filter(
          (user) => user.id !== action.payload.data.id
        );
      
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

export const { clearError } = usersSlice.actions;

export default usersSlice.reducer;
