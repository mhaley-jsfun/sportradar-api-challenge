import app from "../app";
import dotenv from "dotenv";
import mysql from "mysql2";
import request from "supertest";

let pool;

beforeEach(async () => {
  pool = mysql
    .createPool({
      host: process.env.HOST,
      user: process.env.SQL_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    })
    .promise();
});
describe("GET /teams", () => {
  it("should return all teams", async () => {
    const res = await request(app).get("/teams");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("GET /teams", () => {
  it("should return all teams", async () => {
    const res = await request(app).get("/teams");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).to;
  });
});
describe("GET /teams/1", () => {
  it("should return a single team withe the given id teams", async () => {
    const res = await request(app).get("/teams/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await pool.end();
});
dotenv.config();
