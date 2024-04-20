import { createSlice } from "@reduxjs/toolkit";
import { logoutFn } from "./logoutSlice";

const initialState = {
  name: "",
  email: "",
  profilePic: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileFn: (state, action) => {
      for (let key in state) {
        if (action.payload.hasOwnProperty(key)) {
          state[key] = action.payload[key];
        }
      }
      // state.user = action.payload;
      // console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutFn, (state) => {
      return { ...initialState };
    });
  },
});

const profileReducer = profileSlice.reducer;
const profileState = (state) => state.profile;
const { profileFn } = profileSlice.actions;

export { profileReducer, profileState, profileFn };
