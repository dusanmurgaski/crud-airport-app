import { createSlice } from "@reduxjs/toolkit";

export const airportSlice = createSlice({
  name: "name",
  country: "country",
  latitude: "latitude",
  longitude: "longitude",
  airlines: "airlines",
  id: "id",
  initialState: {
    name: "",
    country: "",
    latitude: 0,
    longitude: 0,
    airlines: "",
    id: 0,
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.id = action.payload.id;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.airlines = action.payload.airlines;
    },
  },
});

export const { update } = airportSlice.actions;
export default airportSlice.reducer;
