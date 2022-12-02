import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Players() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/teams").then((res) => {
      setPlayers(res.data);
      console.log(res.data[0].description, "res");
      console.log(players);
    });
  }, []);

  return (
    <div>
      {players.map((item) => (
        <p>{item.description}</p>
      ))}{" "}
    </div>
  );
}

export default Players;
