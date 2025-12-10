import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: any | null; // backend se aane wala pura object
  roles: any | null;
}

const initialState: AuthState = {
  userInfo: null,
  roles: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setUserRoles: (state, action: PayloadAction<any>) => {
      state.roles = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.roles = null;
    },
  },
});

export const { setUserInfo, setUserRoles, clearUserInfo } =
  authSlice.actions;

export default authSlice.reducer;
