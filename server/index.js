import express from "express";
import axios from "axios";
import fetch from "node-fetch";
import cors from "cors";
import { addTeam, getTeam } from "./database.js";
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("welcome");
});

app.get("/teams", async (req, res) => {
  const teamApi = "https://statsapi.web.nhl.com/api/v1/teams";
  const response = await fetch(teamApi);
  const json = await response.json();
  const arr = await json.teams;
  const teams = await getTeam();
  const promises = arr
    .map(async (team) => {
      const isFound = teams.some((item) => {
        return item.id === team.id;
      });
      console.log(isFound, "found");
      const name = team.name;
      const id = team.id;

      if (!isFound) return addTeam(id, name);
    })
    .filter(Boolean);
  await Promise.all(promises);
  res.json(teams);
});
app.get("/live", async (req, res) => {
  const LiveGamesApi = "https://statsapi.web.nhl.com/api/v1/schedule";
  const response = await fetch(LiveGamesApi);
  const json = await response.json();
  const teams = await json.dates;
  const promises = teams
    .map(async (game) => {
      res.json(game.games);
      console.log(game);
    })
    .filter(Boolean);
  await Promise.all(promises);
  // res.json(liveGames);
});
app.get("/teams/:id", async (req, res) => {
  const id = req.params.id;
  const teamApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.roster`;
  const response = await fetch(teamApi);
  const json = await response.json();
  const arr = await json.teams;
  res.json(arr[0]);
});

app.get("/stats/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, "params");
  const statsApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}/stats`;
  const response = await fetch(statsApi);
  const json = await response.json();
  res.json(json.stats);
});
app.get("/schedule", async (req, res) => {
  const scheduleApi =
    "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.broadcasts";
  const response = await fetch(scheduleApi);
  const json = await response.json();
  const [teams] = json.dates;
  res.json(teams.games);
});

app.get("/players", async (req, res) => {
  const playersApi =
    "https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster";
  const response = await fetch(playersApi);
  const json = await response.json();
  const arr = await json.teams;
  const teamArray = await Promise.all(
    arr.map((team) => {
      return team;
    })
  );
  res.json(teamArray);
});
app.get("/team", async (req, res) => {
  try {
    const team = await getTeam();

    team.map((team) => {
      console.log(team.name);
    });
    res.status(200).send(team);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
