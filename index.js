import express from "express";
import axios from "axios";
import { getNotes, getNote, createNote } from "./database.js";

const app = express();

app.use(express.json());
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
