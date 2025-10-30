import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  message: string | null;
  type?: "failed" | "success";
}
// Define the initial state using that type
const initialState: IInitialState = { message: null, type: "failed" };

export const apiErrorSlice = createSlice({
  name: "apiError",
  initialState,
  reducers: {
    setApiErrorMessage: (state, action) => {
      state.message = action?.payload?.message;
      state.type = action?.payload?.type;
    },
  },
});

export const { setApiErrorMessage } = apiErrorSlice.actions;
