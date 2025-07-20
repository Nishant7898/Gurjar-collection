import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  users: [], // store multiple registered users
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const isUserExists = state.users.some(
        u => u.email === action.payload.email
      );
      if (!isUserExists) {
        state.users.push(action.payload);
      }
    },
    login: (state, action) => {
      const user = state.users.find(
        u => u.email === action.payload.email && u.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutAll: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.users = [];
    }
  },
});

export const { signup, login, logout, logoutAll } = authSlice.actions;
export default authSlice.reducer;
