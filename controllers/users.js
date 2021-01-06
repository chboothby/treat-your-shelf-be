const {
  fetchUserById,
  postNewUser,
  removeUser,
  patchUser,
  fetchAllUsersBooks,
  postNewBook,
} = require("../models/users");

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params;
  fetchUserById(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.addNewUser = (req, res, next) => {
  const newUser = req.body;
  postNewUser(newUser)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  const { user_id } = req.params;
  removeUser(user_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  const { user_id } = req.params;
  const updates = req.body;
  patchUser(user_id, updates)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getAllUsersBooks = (req, res, next) => {
  const { user_id } = req.params;
  fetchAllUsersBooks(user_id)
    .then((books) => {
      res.status(200).send({ books });
    })
    .catch(next);
};

exports.addNewBook = (req, res, next) => {
  const { user_id } = req.params;
  const newBook = req.body;
  newBook.owner_id = user_id;
  postNewBook(newBook)
    .then((book) => {
      res.status(201).send({ book });
    })
    .catch(next);
};
