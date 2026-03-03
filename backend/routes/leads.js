// routes/leads.js
const express = require("express");
const router  = express.Router();
const db      = require("../db");
const auth    = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/", auth, async (req, res) => {
  const { nom, contact, email, source, statut } = req.body;
  if (!nom) return res.status(400).json({ error: "nom requis." });
  try {
    const r = await db.query(
      "INSERT INTO leads (nom, contact, email, source, statut) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [nom, contact || "", email || "", source || "Site web", statut || "Nouveau"]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put("/:id", auth, async (req, res) => {
  const { nom, contact, email, source, statut } = req.body;
  try {
    const r = await db.query(
      "UPDATE leads SET nom=$1, contact=$2, email=$3, source=$4, statut=$5 WHERE id=$6 RETURNING *",
      [nom, contact, email, source, statut, req.params.id]
    );
    if (!r.rows[0]) return res.status(404).json({ error: "Lead introuvable." });
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db.query("DELETE FROM leads WHERE id = $1", [req.params.id]);
    res.json({ message: "Lead supprimé." });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;