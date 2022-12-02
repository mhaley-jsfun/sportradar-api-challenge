import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.SQL_USER,
    password: process.env.PASSWORD,
    database: process.env.PLAYER_DATABASE,
  })
  .promise();
export async function getPlayers() {
  const [row] = await pool.query("SELECT * FROM players");

  return row;
  4;
}
export async function getPlayer(id) {
  const [singlePlayer] = await pool.query(
    `SELECT * FROM players WHERE player_id =?`,
    [id]
  );
  return singlePlayer;
}
export async function createPlayer(player_name) {
  const [createdPlayer] = await pool.query(
    `INSERT INTO players (player_name) VALUES (?)`,
    [player_name]
  );
  const id = createdPlayer.insertId;
}
const getPlayerById = getPlayer(1);
const newPlayer = await getPlayers();
const createdResult = await createPlayer("henok");
// console.log(newPlayer, "newplayer");
// console.log(createdResult, "created player");
console.log(getPlayerById, "one player");
