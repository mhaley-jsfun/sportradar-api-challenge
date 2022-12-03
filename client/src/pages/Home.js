import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamCard from "../components/card";
function Home() {
  const [teams, setTeams] = useState([{}]);
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
  return (
    <div className="flex flex-wrap justify-center">
      {teams.map((team) => (
        <div className=" m-6 flex  flex-wrap">
          <TeamCard team={team} />
        </div>
      ))}
    </div>
  );
}

export default Home;
