exports.up = function(knex) {
  return knex.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.string("email", 100).notNullable().unique();
        table.string("password", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
