import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import AircraftList from "./components/AircraftList";
import AircraftDetails from "./components/AircraftDetails";
import { fetchAircraft } from "./utils/apicall";

function App() {
  const [aircraft, setAircraft] = useState([]);

  // Fetch aircraft data
  const loadAircraft = useCallback(async () => {
    try {
      const response = await fetchAircraft(); // API call to fetch aircraft data
      setAircraft(response);
    } catch (error) {
      console.error("Failed to load aircraft:", error);
    }
  }, []);

  useEffect(() => {
    loadAircraft();
  }, [loadAircraft]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aircraftlist" element={<AircraftList aircraft={aircraft} />} />
        <Route path="/aircraft/:id" element={<AircraftDetails />} />
      </Routes>
    </div>
  );
}

export default App;
