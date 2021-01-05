const connection = require("../db/connection");

const formatUser = ({ user_score, user_votes, ...rest }) => {
  const user = {
    ...rest,
    user_rating: user_score / user_votes || 0,
  };
  return user;
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
  const { location, ...rest } = user;
  if (!location) {
    return Promise.reject({
      status: 400,
      msg: "Incomplete request",
    });
  }
  const newUser = {
    ...rest,
    location: `(${location[0]},${location[1]})`,
  };
  return connection
    .insert(newUser)
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
