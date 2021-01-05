const connection = require("../db/connection");

exports.fetchUserById = (user_id) => {
  return connection
    .select(
      "user_id",
      "username",
      "name",
      "email",
      "avatar_pic",
      "location",
      "user_score"
      /
      "user_votes"
      "AS"
      "user_rating"
    )
    .from("users")
    .where("user_id", "=", user_id)
    .then((users) => {
      console.log(users[0]);

      return users[0];
    });
};
