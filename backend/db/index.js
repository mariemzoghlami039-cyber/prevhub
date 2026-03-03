// db/index.js — Connexion Neon PostgreSQL
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // requis pour Neon
});

pool.on("connect", () => {
  console.log("✅ Connecté à Neon PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Erreur PostgreSQL:", err.message);
});

module.exports = pool;
