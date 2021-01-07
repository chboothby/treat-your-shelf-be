const connection = require("../db/connection");

const formatUser = ({ user_score, user_votes, ...rest }) => {
  const user = {
    ...rest,
    user_rating: user_score / user_votes || 0,
  };
  return user;
};

const checkUserExists = async (user_id) => {
  const userExists = await connection
    .select("*")
    .from("users")
    .where("user_id", "=", user_id)
    .then((user) => {
      return user.length !== 0;
    });

  return userExists;
};

exports.fetchUserById = (user_id) => {
  return connection
    .select("*")
    .from("users")
    .where("user_id", "=", user_id)
    .then((users) => {
      if (users.length === 0) {
        return Promise.reject({ status: 404, msg: "User does not exist" });
      }
      const user = formatUser(users[0]);
      return user;
    });
};

exports.postNewUser = (user) => {
  if (Object.keys(user).length === 0)
    return Promise.reject({ status: 400, msg: "Empty request body" });
  const { location } = user;
  if (location) {
    user.location = `(${location[0]},${location[1]})`;
  }

  return connection
    .insert(user)
    .into("users")
    .returning("*")
    .then((users) => {
      return formatUser(users[0]);
    });
};

exports.removeUser = (user_id) => {
  return connection("users")
    .delete()
    .where("user_id", "=", user_id)
    .then((rows) => {
      if (rows === 0)
        return Promise.reject({ status: 404, msg: "User does not exist" });
      return rows;
    });
};

exports.patchUser = (user_id, updates) => {
  if (Object.keys(updates).length === 0)
    return Promise.reject({ status: 400, msg: "Empty request body" });
  if (updates.location) {
    updates.location = `(${updates.location[0]},${updates.location[1]})`;
  }
  const { user_score } = updates;
  return connection("users")
    .update(updates)
    .where("user_id", "=", user_id)
    .modify((queryBuilder) => {
      if (user_score) {
        queryBuilder.update({
          user_score: connection.raw(`user_score + ${user_score}`),
        });
        queryBuilder.increment({ user_votes: 1 });
      }
    })
    .returning("*")
    .then((user) => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "User does not exist" });
      return formatUser(user[0]);
    });
};

exports.fetchAllUsersBooks = (user_id, { sort_by, order }) => {
  const booksPromise = connection
    .select("*")
    .from("books")
    .where("owner_id", "=", user_id)
    .orderBy(sort_by || "date_posted", order || "desc")
    .then((ownersBooks) => {
      const books = {
        book_count: ownersBooks.length,
        books: ownersBooks,
      };
      return books;
    });

  const userExists = checkUserExists(user_id).then((response) => {
    return response;
  });

  return Promise.all([booksPromise, userExists]).then(([books, userExists]) => {
    if (userExists) {
      return books;
    } else {
      return Promise.reject({ status: 404, msg: "User does not exist" });
    }
  });
};

exports.postNewBook = (newBook) => {
  if (Array.isArray(newBook.authors)) {
    newBook.authors = newBook.authors.toString();
  }
  return connection("books")
    .insert(newBook)
    .returning("*")
    .then((book) => {
      return book[0];
    });
};
