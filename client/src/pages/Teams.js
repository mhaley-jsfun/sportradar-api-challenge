import React from "react";
import { Link } from "react-router-dom";

function Teams({ currentTeam }) {
  return (
    <div>
      <p>{currentTeam.name}</p>
      hello {console.log(currentTeam.name, currentTeam.id, "currentTema")}
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Teams;
