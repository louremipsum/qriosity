import { viewQRAction } from "@/app/action";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  qrCount: number;
  userRole: string;
  loading: "idle" | "pending";
  currentRequestId: string | undefined;
  error: any;
}

const getQRCount = createAsyncThunk(
  "app/getQRCount",
  async (_, { requestId }) => {
    const data = await viewQRAction(null);
    return data.processedData.length;
  }
);

const initialState: AppState = {
  qrCount: 0,
  userRole: "",
  loading: "idle",
  currentRequestId: undefined,
  error: null,
};

export const qrSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQRCount.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getQRCount.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.qrCount = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(getQRCount.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { setUserRole } = qrSlice.actions;

export default qrSlice.reducer;
