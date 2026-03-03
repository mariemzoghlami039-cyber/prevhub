// routes/users.js
const express = require("express");
const router  = express.Router();
const db      = require("../db");
const bcrypt  = require("bcryptjs");
const auth    = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const r = await db.query("SELECT id, nom, email, role, actif, created_at FROM utilisateurs ORDER BY created_at DESC");
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "Administrateur")
    return res.status(403).json({ error: "Accès refusé." });
  const { nom, email, password, role } = req.body;
  if (!nom || !email || !password) return res.status(400).json({ error: "Champs requis." });
  try {
    const hash = await bcrypt.hash(password, 10);
    const r = await db.query(
      "INSERT INTO utilisateurs (nom, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, nom, email, role",
      [nom, email.toLowerCase(), hash, role || "Consultant"]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) {
    if (e.code === "23505") return res.status(400).json({ error: "Email déjà utilisé." });
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { nom, email, role, actif } = req.body;
  try {
    const r = await db.query(
      "UPDATE utilisateurs SET nom=$1, email=$2, role=$3, actif=$4 WHERE id=$5 RETURNING id, nom, email, role, actif",
      [nom, email, role, actif, req.params.id]
    );
    if (!r.rows[0]) return res.status(404).json({ error: "Utilisateur introuvable." });
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "Administrateur")
    return res.status(403).json({ error: "Accès refusé." });
  try {
    await db.query("DELETE FROM utilisateurs WHERE id = $1", [req.params.id]);
    res.json({ message: "Utilisateur supprimé." });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;