import express from "express";
import axios from "axios";
import fetch from "node-fetch";
import { getNotes, getNote, createNote } from "./database.js";
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
  } catch (error) {}
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
  const teamApi = "https://statsapi.web.nhl.com/api/v1/tournamentTypes";
  const response = await fetch(teamApi);
  const json = await response.json();
  res.send(json);
  console.log(json, "json");
});
app.get("/stats/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, "params");
  const statsApi = `https://statsapi.web.nhl.com/api/v1/teams/${id}/stats`;
  const response = await fetch(statsApi);
  const json = await response.json();
  res.json(json.stats);
  // res.json(json.stats);
  console.log(json, "json");
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
