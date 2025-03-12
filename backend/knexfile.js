require("dotenv").config(); // Load environment variables

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // ✅ SSL for Render
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // ✅ Ensure SSL is enabled for Render
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
  },
};
