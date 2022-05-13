import { createSlice } from "@reduxjs/toolkit";

export const airlineSlice = createSlice({
  name: "name",
  country: "country",
  id: "id",
  initialState: {
    name: "",
    country: "",
    id: 0,
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.id = action.payload.id;
    },
  },
});

export const { update } = airlineSlice.actions;
export default airlineSlice.reducer;
