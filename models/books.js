const { report } = require("../app");
const connection = require("../db/connection");

const capitaliseFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return `${word[0].toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
};

// const checkBookExists = async (book_id) => {
//   const bookExists = await connection
//     .select("*")
//     .from("books")
//     .where("Book_id", "=", book_id)
//     .then((books) => {
//       return books.length !== 0;
//     });

//   return bookExists;
// };

exports.fetchAllBooks = (user_id, { sort_by, order, title, author }) => {
  if (title) title = capitaliseFirstLetter(title);
  if (author) author = capitaliseFirstLetter(author);
  return connection
    .select("*")
    .from("books")
    .modify((queryBuilder) => {
      if (user_id) {
        queryBuilder.whereNot("owner_id", "=", user_id);
      }
      if (title) {
        queryBuilder.where("title", "LIKE", `%${title}%`);
      }
      if (author) {
        queryBuilder.where("authors", "LIKE", `%${author}%`);
      }
    })
    .orderBy(sort_by || "date_posted", order || "desc")
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
      if (book.length === 0) {
        return Promise.reject({ status: 404, msg: "Book does not exist" });
      }
      return book[0];
    });
};

exports.patchBook = (
  { owner_comments, quality, photo, new_owner_id, display_book },
  book_id
) => {
  return connection
    .select("owner_id")
    .from("books")
    .where("book_id", "=", book_id)
    .then((response) => {
      if (response.length === 0) {
        return Promise.reject({ status: 404, msg: "Book does not exist" });
      } else {
        const { owner_id } = response[0];
        return connection("books")
          .update({
            owner_comments,
            quality,
            photo,
            owner_id: new_owner_id,
            display_book,
          })
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
      }
    });
};

exports.removeBookById = (book_id) => {
  return connection("books")
    .delete()
    .where("book_id", "=", book_id)
    .then((rows) => {
      if (rows === 0) {
        return Promise.reject({ status: 404, msg: "Book does not exist" });
      }
      return rows;
    });
};
