const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);  // Ensure "development" matches your knexfile.js config

module.exports = db;
