// ══════════════════════════════════════════════════════════════
//  PREV'HUB — Backend Server (Node.js + Express + Neon)
//  PORT: 5000
// ══════════════════════════════════════════════════════════════

require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const app     = express();

// ── Middleware ────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Log des requêtes (dev) ────────────────────────────
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} — ${req.method} ${req.path}`);
  next();
});

// ── Routes ────────────────────────────────────────────
app.use("/api/auth",          require("./routes/auth"));
app.use("/api/projets",       require("./routes/projets"));
app.use("/api/leads",         require("./routes/leads"));
app.use("/api/factures",      require("./routes/factures"));
app.use("/api/utilisateurs",  require("./routes/users"));
app.use("/api/taches",        require("./routes/taches"));

// ── Route de test ─────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "✅ Prev'Hub API is running!",
    version: "1.0.0",
    endpoints: [
      "POST   /api/auth/login",
      "GET    /api/auth/me",
      "POST   /api/auth/register",
      "GET    /api/projets",
      "POST   /api/projets",
      "PUT    /api/projets/:id",
      "DELETE /api/projets/:id",
      "GET    /api/leads",
      "POST   /api/leads",
      "PUT    /api/leads/:id",
      "DELETE /api/leads/:id",
      "GET    /api/factures",
      "POST   /api/factures",
      "PUT    /api/factures/:id",
      "PATCH  /api/factures/:id/payer",
      "DELETE /api/factures/:id",
      "GET    /api/utilisateurs",
      "POST   /api/utilisateurs",
      "PUT    /api/utilisateurs/:id",
      "DELETE /api/utilisateurs/:id",
      "GET    /api/taches",
      "POST   /api/taches",
      "PUT    /api/taches/:id",
      "DELETE /api/taches/:id",
    ],
  });
});

// ── 404 Handler ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} introuvable.` });
});

// ── Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err);
  res.status(500).json({ error: "Erreur interne du serveur." });
});

// ── Start ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Prev'Hub Backend lancé sur http://localhost:${PORT}`);
  console.log(`📦 Database: Neon PostgreSQL`);
  console.log(`🔑 JWT: activé`);
});
