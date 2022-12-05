import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamCard from "../components/card";
import { useNavigate } from "react-router-dom";
function Home({ setCurrentTeam, currentTeam }) {
  const [teams, setTeams] = useState([{}]);
  const history = useNavigate();
  useEffect(() => {
    axios
      .get("https://statsapi.web.nhl.com/api/v1/teams/")
      .then((res) => {
        setTeams(res.data.teams);
        console.log(res.data, "teams");
      })
      .then(() => {
        axios
          .post("http://localhost:8080/teams", {
            team_id: teams.team.id,
            team_name: teams.team.name,
          })
          .catch((err) => {
            console.log(err.message, "axios post error");
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleClick = (id, name) => {
    axios
      .get(`http://localhost:8080/teams/${id}`)
      .then((res) => {
        setCurrentTeam({ ...currentTeam, name: name, id: id });
        // console.log(currentTeam, "current");
      })
      .then(() => {})
      .then(() => {
        history("/team");
      });
  };
  return (
    <div className="flex flex-wrap justify-center">
      {teams.map((team) => (
        <div
          onClick={() => handleClick(team.id, team.name)}
          key={team.id}
          className=" m-6 flex  flex-wrap"
        >
          <TeamCard handleClick={handleClick} team={team} />
        </div>
      ))}
    </div>
  );
}

export default Home;
