import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TeamCard } from "../components/card";
function Live() {
  const [liveGames, setLiveGames] = useState([]);
  const [currentTeam, setCurentTeam] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/live").then((res) => {
      setLiveGames(res.data);
      // console.log(res.data);
    });
  }, []);
  const handleClick = (id) => {
    axios.get(`http://localhost:8080/teams/${id}`).then((res) => {
      setCurentTeam(res.data.roster.roster);
    });
    console.log(id);
  };

  return (
    <div>
      {liveGames.map((game) => {
        const date = game.gameDate;
        const time = moment(date).utc().format("YYYY-MM-DD");

        return (
          <div className="flex justify-around ">
            <p onClick={() => handleClick(game.teams.away.team.id)}>
              {game.teams.away.team.name}
            </p>
            <p>{time}</p>
            <p>{game.teams.home.team.name}</p>
          </div>
        );
      })}
      Live <Link to="/">Go Back</Link>;
      {currentTeam.map((team) => {
        return (
          <div>
            <p>{team.person.fullName}</p>
          </div>
        );
        console.log(team.person.fullName, "team");
      })}
    </div>
  );
}

export default Live;
