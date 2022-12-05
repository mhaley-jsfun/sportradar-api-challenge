import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import cron from "node-cron";
import { addTeam, getTeam, addPlayer, getPlayer } from "./database.js";
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
      // first check the database for similar team before inserting the api response
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
  res.json(arr);
});
app.get("/live/feed", async (req, res) => {
  // we get the  id from the client using req.params
  const id = "2017020659";
  const LiveGamesApi = `https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`;
  const response = await fetch(LiveGamesApi);
  const json = await response.json();
  const teams = await json.gameData;
  const players = await json.gameData.players;
  // we will compare the current time and game match time if returns true we will send the match status an player status
  res.json({ teams });
});

app.get("/teams/:id", async (req, res) => {
  const id = req.params.id;
  const teamApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.roster`;
  const response = await fetch(teamApi);
  const json = await response.json();
  const arr = await json.teams;
  // this route only send active player on the team
  res.json(arr[0].roster.roster);
});

app.get("/stats/:id", async (req, res) => {
  // this route sends the specific status about a single team
  const id = req.params.id;
  console.log(id, "params");
  const statsApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}/stats`;
  const response = await fetch(statsApi);
  const json = await response.json();
  const stat = await json;
  const TeamId = await json.stats[1].splits[0].team;
  res.json(stat);
});

app.get("/player/profile/:id", async (req, res) => {
  // this route send profile status about a single user with th given id
  const id = req.params.id;
  const playerProfile = `https://statsapi.web.nhl.com/api/v1/people/${id}`;
  const playerResponse = await fetch(playerProfile);
  const profile = await playerResponse.json();
  res.json(profile.people);
});

app.get("/schedule", async (req, res) => {
  // this route send an upcoming match date and time
  const scheduleApi =
    "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.broadcasts";
  const response = await fetch(scheduleApi);
  const json = await response.json();
  const [teams] = json.dates;
  res.json(teams.games);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});
if (process.env.NODE_ENV !== "test") {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
}

export default app;
