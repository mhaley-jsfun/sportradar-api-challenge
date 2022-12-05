import axios from "axios";
import React, { useEffect, useState } from "react";

function Games() {
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:8080/teams").then((res) => {
    //   setPlayers(res.data);
    //   console.log(res.data[0].description, "res");
    //   console.log(players);
    // });
    axios.get("http://localhost:8080/schedule").then((res) => {
      setSchedule(res.data);
      console.log(schedule, "schedule");
    });
  }, []);

  return (
    <div>
      <h1 className="text-5xl">Upcoming Matches</h1>
      {/* {toggle && players.map((item) => <p>{item.description}</p>)}
      <button onClick={() => setToggle(!toggle)}>toogle</button> */}
      {schedule.map((idx) => {
        console.log(idx, "idx");
        return (
          <div>
            <div className="flex items-center justify-around">
              <div className="ml-2">
                <p onClick={() => console.log(idx.teams.away.team.id)}>
                  {idx.teams.away.team.name}
                  {idx.teams.away.team.id} away
                </p>
              </div>
              <div>
                <p>vs</p>
                <p>{idx.gameDate}</p>
              </div>
              <div>
                <p>{idx.teams.home.team.name} home</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Games;
