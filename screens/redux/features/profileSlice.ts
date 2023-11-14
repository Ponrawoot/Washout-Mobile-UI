import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileItem } from "../../../interfaces";

type ProfileState = {
  profileItem: ProfileItem;
};

const initialState: ProfileState = {
  profileItem: {
    accessToken: "",
    username: "",
    uid: "",
    selectedBranchId: "",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ProfileItem>) => {
      state.profileItem.accessToken = action.payload.accessToken;
      state.profileItem.username = action.payload.username;
      state.profileItem.uid = action.payload.uid;
      state.profileItem.selectedBranchId = ""
    },
    selectBranch: (state, action: PayloadAction<ProfileItem>) => {
      state.profileItem.selectedBranchId = action.payload.selectedBranchId;
    }
  },
});

export const { login, selectBranch } = profileSlice.actions;
export default profileSlice.reducer;
