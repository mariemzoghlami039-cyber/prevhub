// routes/auth.js — Login / Register / Me
const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const db      = require("../db");
const authMW  = require("../middleware/auth");

// ── POST /api/auth/login ──────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email et mot de passe requis." });

  try {
    const result = await db.query(
      "SELECT * FROM utilisateurs WHERE email = $1 AND actif = true",
      [email.toLowerCase()]
    );

    const user = result.rows[0];
    if (!user)
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });

    const token = jwt.sign(
      { id: user.id, email: user.email, nom: user.nom, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, nom: user.nom, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── GET /api/auth/me ──────────────────────────────────
router.get("/me", authMW, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, nom, email, role, created_at FROM utilisateurs WHERE id = $1",
      [req.user.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: "Utilisateur introuvable." });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── POST /api/auth/register ───────────────────────────
router.post("/register", authMW, async (req, res) => {
  // Seul l'admin peut créer des comptes
  if (req.user.role !== "Administrateur")
    return res.status(403).json({ error: "Accès refusé." });

  const { nom, email, password, role } = req.body;
  if (!nom || !email || !password)
    return res.status(400).json({ error: "Champs requis manquants." });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO utilisateurs (nom, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role",
      [nom, email.toLowerCase(), hash, role || "Consultant"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;