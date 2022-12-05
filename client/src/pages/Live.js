import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";

function Live({
  setCurrentPlayerProfile,
  currentPlayerProfile,
  setCurrentPlayerStatus,
}) {
  const [liveGames, setLiveGames] = useState([]);
  const [currentTeam, setCurentTeam] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/live").then((res) => {
      setLiveGames(res.data);
      // console.log(res.data);
    });
  }, []);
  const handleTeam = (id) => {
    axios.get(`http://localhost:8080/teams/${id}`).then((res) => {
      setCurentTeam(res.data);
    });
    console.log(id);
  };
  const handlePlayer = (id) => {
    axios
      .get(`http://localhost:8080/player/profile/${id}`)
      .then((res) => {
        setCurrentPlayerProfile(res.data[0]);
      })
      .then(() => {
        axios
          .get(`http://localhost:8080/player/${id}`)
          .then((res) => {
            console.log(res.data, "data player ");
            setCurrentPlayerStatus(res.data[0].stat);
          })
          .then(() => {
            history("/player");
          });
      });
  };

  return (
    <div>
      <h1 className="text-6xl">Live Games</h1>
      {liveGames.map((game) => {
        const date = game.gameDate;
        const time = moment(date).utc().format("YYYY-MM-DD");

        return (
          <div className="flex justify-around ">
            <p onClick={() => handleTeam(game.teams.away.team.id)}>
              {game.teams.away.team.name}
            </p>
            <p>{time}</p>
            <p onClick={() => handleTeam(game.teams.home.team.id)}>
              {game.teams.home.team.name}
            </p>
          </div>
        );
      })}
      Live <Link to="/">Go Back</Link>;
      {currentTeam.map((team) => {
        return (
          <div className="border-2 border-indigo-600 flex flex-col justify-center ">
            <p onClick={() => handlePlayer(team.person.id)}>
              name= {team.person.fullName}
            </p>
            <p className=""> postion ={team.position.name}</p>
            <p> jerseyNumber={team.jerseyNumber}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Live;
