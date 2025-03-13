exports.up = function(knex) {
  return knex.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("encrypted_password").notNullable(); // ✅ Use encrypted_password
        table.timestamp("created_at").defaultTo(knex.fn.now()); // ✅ Default timestamps
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
