// routes/factures.js
const express = require("express");
const router  = express.Router();
const db      = require("../db");
const auth    = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM factures ORDER BY created_at DESC");
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/", auth, async (req, res) => {
  const { client, montant, statut, echeance, compte_id } = req.body;
  if (!client) return res.status(400).json({ error: "client requis." });
  try {
    // Générer ID facture automatique
    const count = await db.query("SELECT COUNT(*) FROM factures");
    const num   = String(parseInt(count.rows[0].count) + 1).padStart(3, "0");
    const id    = `FAC-${new Date().getFullYear()}-${num}`;

    const r = await db.query(
      "INSERT INTO factures (id, client, montant, statut, echeance, compte_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [id, client, montant || 0, statut || "En attente", echeance || null, compte_id || 1]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put("/:id", auth, async (req, res) => {
  const { client, montant, statut, echeance, compte_id } = req.body;
  try {
    const r = await db.query(
      "UPDATE factures SET client=$1, montant=$2, statut=$3, echeance=$4, compte_id=$5 WHERE id=$6 RETURNING *",
      [client, montant, statut, echeance, compte_id, req.params.id]
    );
    if (!r.rows[0]) return res.status(404).json({ error: "Facture introuvable." });
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Marquer payée
router.patch("/:id/payer", auth, async (req, res) => {
  try {
    const r = await db.query(
      "UPDATE factures SET statut='Payée' WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db.query("DELETE FROM factures WHERE id = $1", [req.params.id]);
    res.json({ message: "Facture supprimée." });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;