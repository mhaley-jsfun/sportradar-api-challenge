import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Games from "./pages/Games";
import Standing from "./pages/Standing";
import Players from "./pages/Players";
import Live from "./pages/Live";
import axios from "axios";
import { useState } from "react";
function App() {
  return (
    <div className="App h-full">
      <Header />
      <Routes>
        <Route path="/games" element={<Games />} />
        <Route path="/standing" element={<Standing />} />
        <Route path="players" element={<Players />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </div>
  );
}

export default App;
