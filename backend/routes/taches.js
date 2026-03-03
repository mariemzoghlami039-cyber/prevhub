// routes/taches.js
const express = require("express");
const router  = express.Router();
const db      = require("../db");
const auth    = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try { res.json((await db.query("SELECT * FROM taches ORDER BY created_at DESC")).rows); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/", auth, async (req, res) => {
  const { titre, projet, priorite, statut, echeance, assigne } = req.body;
  if (!titre) return res.status(400).json({ error: "titre requis." });
  try {
    const r = await db.query(
      "INSERT INTO taches (titre, projet, priorite, statut, echeance, assigne) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [titre, projet || "", priorite || "Normale", statut || "À faire", echeance || null, assigne || ""]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put("/:id", auth, async (req, res) => {
  const { titre, projet, priorite, statut, echeance, assigne } = req.body;
  try {
    const r = await db.query(
      "UPDATE taches SET titre=$1, projet=$2, priorite=$3, statut=$4, echeance=$5, assigne=$6 WHERE id=$7 RETURNING *",
      [titre, projet, priorite, statut, echeance, assigne, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db.query("DELETE FROM taches WHERE id = $1", [req.params.id]);
    res.json({ message: "Tâche supprimée." });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;