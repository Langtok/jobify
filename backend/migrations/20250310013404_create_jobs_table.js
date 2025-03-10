exports.up = function (knex) {
    return knex.schema.createTable("jobs", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.string("title", 255).notNullable();
      table.string("company", 255).notNullable();
      table.string("status", 50).notNullable();
      table.date("applied_date").notNullable();
      table.text("notes");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("jobs");
  };
  