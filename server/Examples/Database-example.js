import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.SQL_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

export async function getNotes() {
  const [row] = await pool.query("SELECT * FROM notes");
  return row;
}
export async function getNote(id) {
  const [title] = await pool.query(`SELECT * FROM notes WHERE id =?`, [id]);
  return title;
}
export async function createNote(title, contents) {
  const [result] = await pool.query(`notes (title, contents) VALUES (?,?)`, [
    title,
    contents,
  ]);
  const id = result.insertId;
  return getNote(id);
}

const note = await getNote();
const result = await getNote(2);
// const createNewNote = await createNote("myThird note", "about life");
// console.log(createNewNote, "note");
