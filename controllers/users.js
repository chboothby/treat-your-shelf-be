const { fetchUserById, postNewUser } = require("../models/users");

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
