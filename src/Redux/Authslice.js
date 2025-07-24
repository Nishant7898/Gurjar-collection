import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  users: [], // Simulated database
  isLoading: false,
  error: null,
  message: null,
  messageType: null, // 'success', 'error'
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Message handling
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.type;
      state.isLoading = false;
    },
    
    clearMessage: (state) => {
      state.message = null;
      state.messageType = null;
    },
    
    // User registration
    registerUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.users.push(newUser);
      state.message = 'Account created successfully! Please login with your credentials.';
      state.messageType = 'success';
      state.isLoading = false;
    },
    
    // User login
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.message = 'Login successful! Welcome back!';
      state.messageType = 'success';
      state.error = null;
    },
    
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = action.payload;
      state.messageType = 'error';
    },
    
    // User logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.message = 'Logged out successfully';
      state.messageType = 'success';
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Password reset
    passwordResetRequest: (state) => {
      state.isLoading = true;
    },
    
    passwordResetSuccess: (state) => {
      state.isLoading = false;
      state.message = 'Password reset link sent to your email!';
      state.messageType = 'success';
    },
    
    passwordResetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = action.payload;
      state.messageType = 'error';
    },
  },
});

export const {
  setLoading,
  setMessage,
  clearMessage,
  registerUser,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  passwordResetRequest,
  passwordResetSuccess,
  passwordResetFailure,
} = authSlice.actions;

export default authSlice.reducer;
export const loginUser = (credentials) => async (dispatch, getState) => {
  dispatch(loginStart());
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { users } = getState().auth;
    const user = users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      dispatch(loginSuccess(userWithoutPassword));
    } else {
      dispatch(loginFailure('Invalid credentials. Please check your email and password.'));
    }
  } catch (error) {
    dispatch(loginFailure('An error occurred during login. Please try again.'));
  }
};

export const signupUser = (userData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { users } = getState().auth;
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      dispatch(setMessage({
        message: 'An account with this email already exists',
        type: 'error'
      }));
      return false;
    }
    
    dispatch(registerUser(userData));
    return true;
  } catch (error) {
    dispatch(setMessage({
      message: 'An error occurred during registration. Please try again.',
      type: 'error'
    }));
    return false;
  }
};

export const requestPasswordReset = (email) => async (dispatch, getState) => {
  dispatch(passwordResetRequest());
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { users } = getState().auth;
    const userExists = users.find(u => u.email === email);
    
    if (userExists) {
      dispatch(passwordResetSuccess());
    } else {
      dispatch(passwordResetFailure('No account found with this email address.'));
    }
  } catch (error) {
    dispatch(passwordResetFailure('An error occurred. Please try again.'));
  }
};