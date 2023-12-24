import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentToken = (state) => state.auth.token;
