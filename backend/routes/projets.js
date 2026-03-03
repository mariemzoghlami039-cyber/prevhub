// routes/projets.js
const express = require("express");
const router  = express.Router();
const db      = require("../db");
const auth    = require("../middleware/auth");

// GET tous
router.get("/", auth, async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM projets ORDER BY created_at DESC");
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET un
router.get("/:id", auth, async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM projets WHERE id = $1", [req.params.id]);
    if (!r.rows[0]) return res.status(404).json({ error: "Projet introuvable." });
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST créer
router.post("/", auth, async (req, res) => {
  const { nom, client, statut, montant, responsable } = req.body;
  if (!nom || !client) return res.status(400).json({ error: "nom et client requis." });
  try {
    const r = await db.query(
      "INSERT INTO projets (nom, client, statut, montant, responsable) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [nom, client, statut || "En brouillon", montant || 0, responsable || ""]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT modifier
router.put("/:id", auth, async (req, res) => {
  const { nom, client, statut, montant, responsable } = req.body;
  try {
    const r = await db.query(
      "UPDATE projets SET nom=$1, client=$2, statut=$3, montant=$4, responsable=$5 WHERE id=$6 RETURNING *",
      [nom, client, statut, montant, responsable, req.params.id]
    );
    if (!r.rows[0]) return res.status(404).json({ error: "Projet introuvable." });
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    await db.query("DELETE FROM projets WHERE id = $1", [req.params.id]);
    res.json({ message: "Projet supprimé." });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;