import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    allProfile: [],
    isDataFetching: false,
  },
  reducers: {
    storeAllProfiles(state, action) {
      state.allProfile = action.payload;
    },
    isFetchingEmpData(state, action) {
      state.isDataFetching = action.payload;
    },
  },
});

export const profileActions = ProfileSlice.actions;
export default ProfileSlice;
