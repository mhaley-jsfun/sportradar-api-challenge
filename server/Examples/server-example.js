import express from "express";
import axios from "axios";
import fetch from "node-fetch";
import { getNotes, getNote, createNote, addTeam } from "./database.js";
import converter from "json-2-csv";
// import { addTeam } from "./Team_DataBase";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("welcome");
});
app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes();
    res.status(200).send(notes);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

app.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await getNote(id);
    res.send(note);
  } catch (error) {
    res.json(error.message);
  }
});
app.get("/teams", async (req, res) => {
  const teamApi = "https://statsapi.web.nhl.com/api/v1/teams";
  const response = await fetch(teamApi);
  const json = await response.json();
  const arr = await json.teams;

  const teamArray = await Promise.all(
    arr.map((team) => {
      const name = team.name;
      const id = team.id;
      // const venue = team.venue.name;
      return addTeam(name, id);
    })
  );
  res.json(teamArray);

  // try {
  //   const newArr = await Promise.all(
  //     arr.map((team) => {
  //       return team;
  //     })
  //   );
  //   const csv = converter.json2csv(newArr, (err, csv) => {
  //     if (err) {
  //       throw err;
  //     }

  //     // print CSV string
  //     // console.log(csv);
  //   });
  //   res.status(200).json("sucsuss");
  //   console.log("csv sucess");
  // } catch (error) {
  //   console.log(error);
  // }

  // console.log(arr, "json");
});
app.get("/teams/:id", async (req, res) => {
  const id = req.params.id;
  const teamApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}`;
  const response = await fetch(teamApi);
  const json = await response.json();
  const arr = await json.teams;

  res.json(arr[0]);
  console.log(arr, "json");
});
app.get("/stats/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, "params");
  const statsApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}/stats`;
  const response = await fetch(statsApi);
  const json = await response.json();
  res.json(json.stats);
  // res.json(json.stats);
  // console.log(json, "json");
});
app.get("/schedule", async (req, res) => {
  const scheduleApi =
    "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.broadcasts";
  const response = await fetch(scheduleApi);
  const json = await response.json();
  const [teams] = json.dates;

  res.json(teams.games);
  console.log(json, "json");
});

app.get("/players", async (req, res) => {
  const playersApi =
    "https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster";
  const response = await fetch(playersApi);
  const json = await response.json();
  const arr = await json.teams;

  const teamArray = await Promise.all(
    arr.map((team) => {
      console.log(team, "team");
      // const venue = team.venue.name;
      return addTeam();
    })
  );
  res.json(teamArray);
});
app.post("/notes", async (req, res) => {
  try {
    const { title, contents } = req.body;
    const note = await createNote(title, contents);
    res.status(201).send(note);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// app.post("/teams", async (req, res) => {
//   try {
//     const { team_id, team_name } = req.body;
//     const team = await addTeam(team_id, team_name);
//     res.json(team);
//   } catch (error) {
//     res.json(error.message, "backend err");
//   }
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
