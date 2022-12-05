import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Games from "./pages/Games";
import Standing from "./pages/Standing";
import Players from "./pages/Players";
import Live from "./pages/Live";
import { useState } from "react";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
function App() {
  const [currentTeam, setCurrentTeam] = useState({ name: "hhhh", id: "1" });
  const [currentPlayerProfile, setCurrentPlayerProfile] = useState([]);
  const [currentPlayerStatus, setCurrentPlayerStatus] = useState([]);
  return (
    <div className="App h-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home setCurrentTeam={setCurrentTeam} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/standing" element={<Standing />} />
        <Route
          path="player"
          currentPlayerStatus={currentPlayerStatus}
          element={
            <Players
              currentPlayerProfile={currentPlayerProfile}
              currentPlayerStatus={currentPlayerStatus}
            />
          }
        />
        <Route
          path="/live"
          element={
            <Live
              currentPlayerProfile={currentPlayerProfile}
              setCurrentPlayerProfile={setCurrentPlayerProfile}
              setCurrentPlayerStatus={setCurrentPlayerStatus}
              currentPlayerStatus={currentPlayerStatus}
            />
          }
        />
        <Route path="/team" element={<Teams currentTeam={currentTeam} />} />
      </Routes>
    </div>
  );
}

export default App;
