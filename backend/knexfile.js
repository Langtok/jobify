require("dotenv").config(); // Load environment variables

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL, // ✅ Use DATABASE_URL for Render
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // ✅ Use DATABASE_URL for Production
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
