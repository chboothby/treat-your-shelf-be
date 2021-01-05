process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("./api", () => {
  beforeEach(() => connection.seed.run());
  afterAll(() => connection.destroy());

  describe("/api/users/", () => {
    describe("/api/users/:user_id", () => {
      test("GET request returns all user data", () => {
        return request(app).get("/api/users/1").expect(200);
        //   .then((res) => {
        //     expect(res.body.topics.length).toBe(3);
      });
    });
  });
});
