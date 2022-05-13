import { configureStore } from "@reduxjs/toolkit";
import airlineReducer from "./airlineSlice";
import airportReducer from "./airportSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    airline: airlineReducer,
    airport: airportReducer,
    auth: authReducer,
  },
});
