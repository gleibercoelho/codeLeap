import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearUserData: (state) => {
      state.username = "";
      state.token = "";
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
