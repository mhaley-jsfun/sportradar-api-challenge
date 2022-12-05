import supertest from "supertest";
import app from "./app";
describe("GET /teams return an array of teams", () => {
  return supertest(app)
    .get("/teams")
    .expect(200)
    .then((response) => {
      expect(response.status).teEqual(200);
    });
});
