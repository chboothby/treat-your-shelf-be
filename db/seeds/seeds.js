const { userData, bookData, exchangeData } = require("../data/index.js");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.insert(userData).into("users").returning("*");
    })
    .then(() => {
      return knex.insert(bookData).into("books").returning("*");
    })
    .then(() => {
      return knex.insert(exchangeData).into("exchanges").returning("*");
    });
};
