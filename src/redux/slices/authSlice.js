import { createSlice } from "@reduxjs/toolkit";

const COOKIE_NAME = process.env.REACT_APP_COOKIE_NAME || "TaskTracker";

// Get initial state from localStorage if available
const getInitialState = () => {
  const token = localStorage.getItem(COOKIE_NAME);
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  return {
    user,
    token,
    loading: false,
    error: null,
    signupData: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      country: "",
    },
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = {
        ...state.signupData,
        ...action.payload,
      };
    },
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem(COOKIE_NAME);
      localStorage.removeItem("user");

      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.signupData = initialState.signupData;
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  setSignupData,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
