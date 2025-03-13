require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // ✅ Force SSL for Render
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
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
