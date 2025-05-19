import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    resetProfile: (state) => {
      state.loading = false;
      state.error = null;
      state.userProfile = null;
    },
  },
});

export const { setLoading, setError, setUserProfile, resetProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
