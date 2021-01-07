exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.text("user_id").primary().unique();
    usersTable.text("username").notNullable().unique();
    usersTable.text("name");
    usersTable.text("email").notNullable();
    usersTable.text("avatar_pic");
    usersTable.specificType("location", "POINT");
    usersTable.integer("user_score").defaultTo(0);
    usersTable.integer("user_votes").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
