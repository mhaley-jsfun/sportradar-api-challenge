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
export async function getTeam(id) {
  const [title] = await pool.query(`SELECT * FROM Teams WHERE id =?`, [id]);
  return title;
}
// export async function addTeams(team_id, team_name, team_venue, isActive) {
//   const [result] = await pool.query(
//     `INSERT INTO Teams (team_id, team_name,team_venue, isActive) VALUES (?,?,?,?)`,
//     [team_id, team_name, team_venue, isActive]
//   );
//   const id = result.insertId;
//   return getTeam(id);
// }
export async function addTeam(team_id, team_name) {
  const [result] = await pool.query(
    `INSERT INTO team (team_id, team_name) VALUES (?,?)`,
    [team_id, team_name, team_venue, isActive]
  );
  //   const id = result.insertId;
  return result;
}
const newTeam = await addTeam();
console.log(newTeam, "newteam");
