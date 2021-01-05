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
      const user = formatUser(users[0]);
      return user;
    });
};

exports.postNewUser = ({ location, ...rest }) => {
  const newUser = { ...rest, location: `(${location[0]},${location[1]})` };
  return connection
    .insert(newUser)
    .into("users")
    .returning("*")
    .then((users) => {
      return formatUser(users[0]);
    });
};
