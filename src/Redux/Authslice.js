import { createSlice } from "@reduxjs/toolkit";

// Helper to safely parse JSON
const getLocalStorageItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return null;
  }
};

const initialState = {
  users: getLocalStorageItem("users") || [],
  currentUser: getLocalStorageItem("currentUser") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    removeAccount: (state) => {
      if (state.currentUser) {
        // Filter out the current user from the users list
        const updatedUsers = state.users.filter(
          (user) =>
            user.email !== state.currentUser.email &&
            user.phone !== state.currentUser.phone
        );

        state.users = updatedUsers;
        state.currentUser = null;

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("currentUser");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("auth/signup/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/signup/fulfilled", (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users));
      })
      .addCase("auth/signup/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("auth/login/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      })
      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Thunk: signup
export const signup = (userData) => async (dispatch) => {
  dispatch({ type: "auth/signup/pending" });
  try {
    const { email, phone, password } = userData;
    if (!email || !phone || !password) {
      throw new Error("All fields are required");
    }

    const users = getLocalStorageItem("users") || [];
    const userExists = users.some(
      (user) => user.email === email || user.phone === phone
    );
    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = { email, phone, password };
    dispatch({ type: "auth/signup/fulfilled", payload: newUser });
    return newUser;
  } catch (error) {
    dispatch({ type: "auth/signup/rejected", payload: error.message });
    throw error;
  }
};

// Thunk: login
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: "auth/login/pending" });
  try {
    const { emailOrPhone, password } = credentials;
    if (!emailOrPhone || !password) {
      throw new Error("Email/phone and password are required");
    }

    const users = getLocalStorageItem("users") || [];
    const user = users.find(
      (user) =>
        (user.email === emailOrPhone || user.phone === emailOrPhone) &&
        user.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    dispatch({ type: "auth/login/fulfilled", payload: user });
    return user;
  } catch (error) {
    dispatch({ type: "auth/login/rejected", payload: error.message });
    throw error;
  }
};

// Actions
export const { clearError, logout, removeAccount } = authSlice.actions;

export default authSlice.reducer;
