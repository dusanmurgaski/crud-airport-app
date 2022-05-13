import AirlinesPage from "./pages/AirlinesPage";
import AirportsPage from "./pages/AirportsPage";
import CreateAirlinePage from "./pages/CreateAirlinePage";
import CreateAirportPage from "./pages/CreateAirportPage";
import LandingPage from "./pages/LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateAirlinePage from "./pages/UpdateAirlinePage";
import UpdateAirportPage from "./pages/UpdateAirportPage";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/airlines" /> : <LandingPage />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/airports" element={<AirportsPage />} />
        <Route path="/airlines" element={<AirlinesPage />} />
        <Route path="/createairport" element={<CreateAirportPage />} />
        <Route path="/createairline" element={<CreateAirlinePage />} />
        <Route path="/updateairline/:id" element={<UpdateAirlinePage />} />
        <Route path="/updateairport/:id" element={<UpdateAirportPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
