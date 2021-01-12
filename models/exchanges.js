const connection = require("../db/connection");
const { patchBook } = require("./books");

exports.fetchAllUsersExchanges = (user_id) => {
  return connection
    .select("*")
    .from("exchanges")
    .where("exchanges.owner_id", user_id)
    .orWhere("exchanges.requester_id", user_id);
};

exports.postExchangeRequest = (user_id, book_id) => {
  return connection
    .select("owner_id")
    .from("books")
    .where("book_id", book_id)
    .then(([{ owner_id }]) => {
      return connection
        .insert({ owner_id, book_id, requester_id: user_id })
        .into("exchanges")
        .returning("*");
    })
    .then((response) => {
      return response[0];
    });
};

exports.deleteExchange = (exchange_id) => {
  return connection("exchanges")
    .delete()
    .where("exchange_id", exchange_id)
    .then((rows) => {
      if (rows === 0) {
        return Promise.reject({ status: 404, msg: "Exchange id not found" });
      } else return rows;
    });
};

exports.patchExchangeRequest = (
  { user_id, exchange_id },
  { book_sent, book_received }
) => {
  return connection("exchanges")
    .update({ book_received, book_sent })
    .where("exchange_id", exchange_id)
    .returning("*")
    .then((response) => {
      const { book_sent, book_received, book_id, requester_id } = response[0];
      if (book_sent && book_received) {
        patchBook({}, book_id, requester_id);
        return connection("exchanges")
          .delete()
          .where("exchange_id", exchange_id)
          .then((res) => {
            console.log(res);
          })
          .then(() => {
            return response[0];
          });
      } else return response[0];
    });
};
