process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  afterAll(() => connection.destroy());
  // USERS *************************
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
      test("PATCH returns 201 and object containing updated user", () => {
        return request(app)
          .patch("/api/users/2")
          .send({
            username: "bob",
          })
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user.username).toBe("bob");
          });
      });
      test("PATCH returns 201 and updates user rating", () => {
        return request(app)
          .patch("/api/users/2")
          .send({
            user_score: 3,
          })
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user.user_rating).toBe(3);
          });
      });
      test("DELETE request returns 204 for successful delete", () => {
        return request(app)
          .delete("/api/users/1")
          .expect(204)
          .then(() => {
            return connection
              .select("*")
              .from("users")
              .where("user_id", "=", 1);
          })
          .then((rows) => {
            expect(rows.length).toBe(0);
          });
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
      it("DELETE - 400 id NaN", () => {
        return request(app)
          .delete("/api/users/NaN")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input type");
          });
      });
      it("PATCH - 400 empty request", () => {
        return request(app)
          .patch("/api/users/2")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Empty request body");
          });
      });
      it("PATCH - 400 invalid request", () => {
        return request(app)
          .patch("/api/users/2")
          .send({ potato: 1 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input type");
          });
      });
      it("PATCH - 404 user does not exist", () => {
        return request(app)
          .patch("/api/users/1000")
          .send({ name: "Eric" })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User does not exist");
          });
      });
    });
  });
  // USERS BOOKS *************************
  describe("/api/users/:user_id/books", () => {
    // GET
    test("GET - responds with 200 and array of all books owned by specified owner", () => {
      return request(app)
        .get("/api/users/1/books")
        .expect(200)
        .then(({ body: { books } }) => {
          expect(books.book_count).toBe(2);
          expect(books.books.length).toBe(2);
        });
    });
    // SORT/FILTER BOOKSHELF BOOKS
    // POST
    test("POST - responds with 201, allows user to post book and returns object containing newly added book", () => {
      return request(app)
        .post("/api/users/1/books")
        .send({
          title: "Pride and Prejudice",
          authors: ["Jane Austen"],
          published_year: 2016,
          ISBN: "9781911060130",
          thumbnail:
            "http://books.google.com/books/content?id=dZ7zjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          quality: 4,
          owner_comments: "My fave book",
        })
        .expect(201)
        .then(({ body: { book } }) => {
          expect(Object.keys(book).length).toBe(14);
        });
    });
    // ERRORS
    describe("ERRORS", () => {
      test("GET - 404 user does not exist", () => {
        return request(app)
          .get("/api/users/100/books")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User does not exist");
          });
      });
    });
  });
  // ALL BOOKS *******************
  describe("/api/books", () => {
    // GET
    test("GET all books, responds with 200 and an array of book objects and book count key", () => {
      return request(app)
        .get("/api/books")
        .send({ user_id: 1 })
        .expect(200)
        .then(({ body: { books } }) => {
          expect(books.book_count).toBe(2);
          expect(books.books.length).toBe(2);
        });
    });
    // SORT
    // FILTER
  });
  // SINGLE BOOK *******************
  describe("/api/books/:book_id", () => {
    test("GET individual book, responds with 200 and a single book object", () => {
      return request(app)
        .get("/api/books/4")
        .expect(200)
        .then(({ body: { book } }) => {
          expect(book.book_id).toBe(4);
          expect(Object.keys(book).length).toBe(14);
        });
    });
    // GET
    // UPDATE
    // UPDATE/SWAP
    // DELETE
  });
});
