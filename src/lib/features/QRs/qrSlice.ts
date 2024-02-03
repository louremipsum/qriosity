import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  qrCount: number;
  userRole: string;
}

const initialState: AppState = {
  qrCount: 0,
  userRole: "",
};

export const qrSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setQRCount: (state, action: PayloadAction<number>) => {
      state.qrCount = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
});

export const { setQRCount, setUserRole } = qrSlice.actions;

export default qrSlice.reducer;
