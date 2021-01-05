process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  afterAll(() => connection.destroy());

  describe("/api/users", () => {
    test("POST returns 201 and object containing new user", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "clsfoy",
          name: "charlie",
          email: "charlie@gmail.com",
          location: [53.8008, 1.5491],
        })
        .expect(201)
        .then(({ body: { user } }) => {
          expect(Object.keys(user)).toEqual([
            "user_id",
            "username",
            "name",
            "email",
            "avatar_pic",
            "location",
            "user_rating",
          ]);
        });
    });
    describe("/api/users/:user_id", () => {
      test("GET request returns 200 and object containing user data with specified ID", () => {
        return request(app)
          .get("/api/users/1")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(Object.keys(user)).toEqual([
              "user_id",
              "username",
              "name",
              "email",
              "avatar_pic",
              "location",
              "user_rating",
            ]);
          });
      });
      test("DELETE request returns 204 for successful delete", () => {
        return request(app).delete("/api/users/1").expect(204);
      });
    });

    describe("ERRORS", () => {
      it("POST - 400 empty post request", () => {
        return request(app)
          .post("/api/users")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Empty request body");
          });
      });
      it("POST - 400 incorrect data type", () => {
        return request(app)
          .post("/api/users")
          .send({
            name: "steve",
            username: "stevo",
            email: "stevo@gmail.com",
            location: "liverpool",
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input type");
          });
      });
      it("POST - 400 incomplete request", () => {
        return request(app)
          .post("/api/users")
          .send({
            name: "steve",
            username: "stevo",
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Incomplete request");
          });
      });
      it("GET - 404 id out of range", () => {
        return request(app)
          .get("/api/users/1000")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User does not exist");
          });
      });
      it("GET - 400 id NaN", () => {
        return request(app)
          .get("/api/users/NaN")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input type");
          });
      });
      it("DELETE - 404 id out of range", () => {
        return request(app)
          .delete("/api/users/1000")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User does not exist");
          });
      });
      it.only("DELETE - 400 id NaN", () => {
        return request(app)
          .delete("/api/users/NaN")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input type");
          });
      });
    });
  });
});
