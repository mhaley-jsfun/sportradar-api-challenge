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

export async function addTeam(id, name) {
  const id1 = id;
  const name1 = name;
  if (id1 === undefined && name1 === undefined) {
    console.log("error");
  } else {
    console.log(id, name, "name");
    const [result] = await pool.query(
      `INSERT INTO team (id, name) VALUES (?,?)`,
      [id1, name1]
    );
    //   const id = result.insertId;
    return result;
  }
}
export async function addPlayer(
  id,
  name,
  age,
  number,
  position,
  assists,
  goal,
  hits,
  points,
  penaltyMinutes
) {
  if (id === undefined && name === undefined) {
    console.log("error");
  } else {
    console.log(id, name, "name");
    const [result] = await pool.query(
      `INSERT INTO player (id, name, age, number, position, assists, goal, hits, points, penaltyMinutes
        ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        name,
        age,
        number,
        position,
        assists,
        goal,
        hits,
        points,
        penaltyMinutes,
      ]
    );
    //   const id = result.insertId;
    return result;
  }
}
export async function getTeam() {
  const [row] = await pool.query("SELECT * FROM team");
  return row;
}
export async function getPlayer() {
  const [row] = await pool.query("SELECT * FROM player");
  return row;
}
const newTeam = await addTeam();
// console.log(newTeam, "newteam");
