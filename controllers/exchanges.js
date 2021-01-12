const {
  fetchAllUsersExchanges,
  postExchangeRequest,
  patchExchangeRequest,
  deleteExchange,
} = require("../models/exchanges");

exports.getAllUsersExchanges = (req, res, next) => {
  const { user_id } = req.params;
  fetchAllUsersExchanges(user_id)
    .then((exchanges) => {
      res.status(200).send({ exchanges });
    })
    .catch(next);
};

exports.addExchangeRequest = (req, res, next) => {
  const { user_id } = req.params;
  const { book_id } = req.body;
  postExchangeRequest(user_id, book_id)
    .then((exchange) => {
      res.status(201).send({ exchange });
    })
    .catch(next);
};

exports.updateExchangeRequest = (req, res, next) => {
  patchExchangeRequest(req.params, req.body)
    .then((exchange) => {
      res.status(201).send({ exchange });
    })
    .catch(next);
};

exports.removeExchange = (req, res, next) => {
  const { exchange_id } = req.params;
  deleteExchange(exchange_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
