const connection = require("../db/connection");

exports.fetchAllBooks = (user_id) => {
  return connection
    .select("*")
    .from("books")
    .whereNot("owner_id", "=", user_id)
    .then((books) => {
      return {
        book_count: books.length,
        books,
      };
    });
};

exports.fetchBookById = (book_id) => {
  return connection
    .select("*")
    .from("books")
    .where("book_id", "=", book_id)
    .then((book) => {
      return book[0];
    });
};

exports.patchBook = (
  { owner_comments, quality, photo, new_owner_id },
  book_id
) => {
  return connection
    .select("owner_id")
    .from("books")
    .where("book_id", "=", book_id)
    .then((response) => {
      const { owner_id } = response[0];
      return connection("books")
        .update({ owner_comments, quality, photo, owner_id: new_owner_id })
        .modify((queryBuilder) => {
          if (new_owner_id) {
            queryBuilder.update({
              previous_owners: connection.raw(
                "array_append(previous_owners, ?)",
                [owner_id]
              ),
            });
          }
        })
        .where("book_id", "=", book_id)
        .returning("*")
        .then((book) => {
          return book[0];
        });
    });
};
