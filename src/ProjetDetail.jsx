// ══════════════════════════════════════════════════════════════
//  ProjetDetail.jsx — Modal projet complet
//  Inspiré de backoffice.preveris.pro
// ══════════════════════════════════════════════════════════════
import { useState } from "react";

const ETAPES = [
  "Opportunité",
  "En attente de signature client",
  "En attente de retour du client",
  "Dossier envoyé",
  "Réalisation pièces graphiques",
  "Réalisation projet",
  "Terminé",
];

const MOCK_EQUIPE = [
  { nom: "Karim Benzara",  role: "Référent Projet",             email: "karim@preveris.pro" },
  { nom: "Amira Touati",   role: "Préventionniste Indépendant", email: "amira@preveris.pro" },
];

function Avatar({ nom }) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: "var(--primary-light)", border: "2px solid var(--primary)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: 15, color: "var(--primary)", flexShrink: 0,
    }}>
      {nom?.[0]?.toUpperCase()}
    </div>
  );
}

// ── Tab: Informations ──────────────────────────────────────
function TabInformations({ projet, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
      {/* Gauche */}
      <div>
        <div className="pd-section-title">📍 Établissement</div>
        <div className="pd-info-box">
          <div className="pd-info-label">Nom Enseigne</div>
          <div className="pd-info-value locked">
            🔒 {projet.client}
            <span className="pd-locked-badge">Non modifiable</span>
          </div>
        </div>
        <div className="pd-info-box" style={{ marginTop: 12 }}>
          <div className="pd-info-label">Ville</div>
          <input className="pd-input" value={projet.ville || ""} onChange={e => onChange("ville", e.target.value)} placeholder="Ville..." />
        </div>
        <div className="pd-info-box" style={{ marginTop: 12 }}>
          <div className="pd-info-label">Adresse</div>
          <input className="pd-input" value={projet.adresse || ""} onChange={e => onChange("adresse", e.target.value)} placeholder="Adresse complète..." />
        </div>

        <div className="pd-section-title" style={{ marginTop: 24 }}>👤 Contact Client</div>
        <div className="pd-contact-card">
          <Avatar nom={projet.contactNom || "C"} />
          <div>
            <div style={{ fontWeight: 700 }}>{projet.contactNom || "—"}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{projet.contactEmail || "—"}</div>
          </div>
          <button className="action-btn" onClick={() => {}}>✏️</button>
          <button className="action-btn" onClick={() => {}}>✉️</button>
        </div>
        <div className="field" style={{ marginTop: 10 }}>
          <label>Nom Contact</label>
          <input className="pd-input" value={projet.contactNom || ""} onChange={e => onChange("contactNom", e.target.value)} placeholder="Nom du contact..." />
        </div>
        <div className="field">
          <label>Email Contact</label>
          <input className="pd-input" value={projet.contactEmail || ""} onChange={e => onChange("contactEmail", e.target.value)} placeholder="email@client.fr" />
        </div>
      </div>

      {/* Droite */}
      <div>
        <div className="pd-section-title">📋 Prestations et description</div>
        <div className="field">
          <label>Prestations siège</label>
          <select className="pd-input" value={projet.prestationSiege || ""} onChange={e => onChange("prestationSiege", e.target.value)}>
            <option value="">Ajouter une prestation...</option>
            <option>AMO Préventionniste</option>
            <option>Audit prévoyance</option>
            <option>Conseil retraite</option>
            <option>Étude comparative</option>
          </select>
        </div>
        <div className="field">
          <label>Prestations indépendant</label>
          <select className="pd-input" value={projet.prestationIndep || ""} onChange={e => onChange("prestationIndep", e.target.value)}>
            <option value="">Ajouter une prestation...</option>
            <option>AMO Préventionniste</option>
            <option>Audit prévoyance</option>
            <option>Conseil retraite</option>
          </select>
        </div>
        <div className="field">
          <label>Prestation personnalisée</label>
          <input className="pd-input" value={projet.prestationCustom || ""} onChange={e => onChange("prestationCustom", e.target.value)} placeholder="+ Ajouter une prestation personnalisée" />
        </div>

        <div className="pd-section-title" style={{ marginTop: 20 }}>📅 Deadlines</div>
        <div className="field">
          <label>Deadline Client</label>
          <input type="date" className="pd-input" value={projet.deadlineClient || ""} onChange={e => onChange("deadlineClient", e.target.value)} />
        </div>
        <div className="field">
          <label>Deadline Indépendant</label>
          <input type="date" className="pd-input" value={projet.deadlineIndep || ""} onChange={e => onChange("deadlineIndep", e.target.value)} />
        </div>
        <div className="field">
          <label>Descriptif complet</label>
          <textarea className="pd-input" rows={3} value={projet.descriptif || ""} onChange={e => onChange("descriptif", e.target.value)} placeholder="Description du projet..." />
        </div>
      </div>
    </div>
  );
}

// ── Tab: Assignation ───────────────────────────────────────
function TabAssignation({ projet, onChange }) {
  const [equipe, setEquipe] = useState(projet.equipe || MOCK_EQUIPE);
  const [showAdd, setShowAdd] = useState(false);
  const [newMembre, setNewMembre] = useState({ nom: "", role: "", email: "" });

  const addMembre = () => {
    if (!newMembre.nom) return;
    setEquipe(prev => [...prev, newMembre]);
    onChange("equipe", [...equipe, newMembre]);
    setNewMembre({ nom: "", role: "", email: "" });
    setShowAdd(false);
  };

  return (
    <div>
      <div className="pd-section-title">👥 Équipe assignée au projet</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
        {equipe.map((m, i) => (
          <div key={i} className="pd-membre-card">
            <Avatar nom={m.nom} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.nom}</div>
              <div style={{ fontSize: 12, color: "var(--primary)" }}>{m.role}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>✉️ {m.email}</div>
            </div>
            <button className="action-btn" style={{ marginLeft: "auto" }}
              onClick={() => { setEquipe(prev => prev.filter((_, j) => j !== i)); }}>✕</button>
          </div>
        ))}
        <div className="pd-membre-card add" onClick={() => setShowAdd(true)} style={{ cursor: "pointer", border: "2px dashed var(--border)", justifyContent: "center" }}>
          <span style={{ fontSize: 24, color: "var(--text-muted)" }}>＋</span>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Ajouter un membre</span>
        </div>
      </div>

      {showAdd && (
        <div className="pd-info-box">
          <div className="pd-section-title">Nouveau membre</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <input className="pd-input" placeholder="Nom" value={newMembre.nom} onChange={e => setNewMembre(p => ({ ...p, nom: e.target.value }))} />
            <input className="pd-input" placeholder="Rôle" value={newMembre.role} onChange={e => setNewMembre(p => ({ ...p, role: e.target.value }))} />
            <input className="pd-input" placeholder="Email" value={newMembre.email} onChange={e => setNewMembre(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn sm" onClick={addMembre}>Ajouter</button>
            <button className="btn sm outline" onClick={() => setShowAdd(false)}>Annuler</button>
          </div>
        </div>
      )}

      <div className="pd-section-title" style={{ marginTop: 20 }}>🔖 Réalisateur principal</div>
      <div className="field">
        <select className="pd-input" value={projet.realisateur || ""} onChange={e => onChange("realisateur", e.target.value)}>
          <option value="">Non assigné</option>
          {equipe.map((m, i) => <option key={i}>{m.nom}</option>)}
          <option>Karim Benzara</option>
          <option>Amira Touati</option>
          <option>Omar Saïdi</option>
          <option>Nadia Khalil</option>
        </select>
      </div>
    </div>
  );
}

// ── Tab: Avancement ────────────────────────────────────────
function TabAvancement({ projet, onChange }) {
  const etapeActuelle = ETAPES.indexOf(projet.statut);

  const [historique, setHistorique] = useState(projet.historique || [
    { date: "2026-02-01", statut: "Opportunité", note: "Premier contact établi", user: "Admin" },
    { date: "2026-02-15", statut: projet.statut, note: "Passage à l'étape suivante", user: "Karim B." },
  ]);

  const [note, setNote] = useState("");

  const changerEtape = (etape) => {
    const nouvelHisto = { date: new Date().toISOString().slice(0, 10), statut: etape, note: note || "Mise à jour du statut", user: "Admin" };
    const newHisto = [...historique, nouvelHisto];
    setHistorique(newHisto);
    onChange("statut", etape);
    onChange("historique", newHisto);
    setNote("");
  };

  return (
    <div>
      <div className="pd-section-title">📊 Étapes du projet</div>

      {/* Pipeline visuel */}
      <div className="pd-pipeline">
        {ETAPES.map((e, i) => {
          const done   = i < etapeActuelle;
          const active = i === etapeActuelle;
          return (
            <div key={e} className={`pd-etape ${done ? "done" : ""} ${active ? "active" : ""}`}
              onClick={() => changerEtape(e)} title={`Passer à: ${e}`}>
              <div className="pd-etape-circle">
                {done ? "✓" : i + 1}
              </div>
              <div className="pd-etape-label">{e}</div>
            </div>
          );
        })}
      </div>

      {/* Ajouter une note */}
      <div className="pd-info-box" style={{ marginTop: 24 }}>
        <div className="pd-section-title">✏️ Ajouter une note d'avancement</div>
        <textarea className="pd-input" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Décrivez l'avancement, les actions effectuées..." />
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {ETAPES.map(e => (
            <button key={e} className={`btn sm ${e === projet.statut ? "" : "outline"}`}
              style={{ fontSize: 11 }} onClick={() => changerEtape(e)}>
              → {e}
            </button>
          ))}
        </div>
      </div>

      {/* Historique */}
      <div className="pd-section-title" style={{ marginTop: 24 }}>🕐 Historique des modifications</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {[...historique].reverse().map((h, i) => (
          <div key={i} className="pd-histo-row">
            <div className="pd-histo-dot" />
            <div className="pd-histo-content">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{h.statut}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{h.date} · {h.user}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 3 }}>{h.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Synthèse / Rapport ────────────────────────────────
function TabSynthese({ projet, onChange }) {
  const [synthese, setSynthese] = useState(projet.synthese || "");
  const [generating, setGenerating] = useState(false);
  const [sections, setSections] = useState(projet.sections || []);

  const addSection = () => {
    setSections(prev => [...prev, { titre: "Nouvelle section", contenu: "", date: new Date().toISOString().slice(0, 10) }]);
  };

  const genererAI = () => {
    setGenerating(true);
    setTimeout(() => {
      const texte = `RAPPORT DE SUIVI — ${projet.client}
Date: ${new Date().toLocaleDateString("fr-FR")}
Projet N°: ${projet.id}

ÉTAT ACTUEL: ${projet.statut}
Responsable: ${projet.resp || "Non assigné"}
Montant: ${Number(projet.montant || 0).toLocaleString()} €

RÉSUMÉ:
Le projet ${projet.client} est actuellement en phase "${projet.statut}". 
${projet.descriptif ? "Description: " + projet.descriptif : ""}
${projet.deadlineClient ? "Deadline client: " + projet.deadlineClient : ""}

ÉQUIPE ASSIGNÉE:
${(projet.equipe || MOCK_EQUIPE).map(m => `• ${m.nom} — ${m.role}`).join("\n")}

PROCHAINES ÉTAPES:
• Suivre l'avancement selon le pipeline défini
• Maintenir le contact avec le client
• Respecter les délais convenus

Rapport généré automatiquement par Prev'Hub AI`;
      setSynthese(texte);
      onChange("synthese", texte);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="pd-section-title" style={{ margin: 0 }}>📝 Synthèse du Projet</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn sm outline" onClick={genererAI} disabled={generating}>
            {generating ? "⏳ Génération..." : "🤖 Générer avec AI"}
          </button>
          <button className="btn sm outline" onClick={addSection}>＋ Ajouter section</button>
          <button className="btn sm" onClick={() => window.print()}>🖨️ Imprimer</button>
        </div>
      </div>

      <textarea
        className="pd-input"
        rows={12}
        value={synthese}
        onChange={e => { setSynthese(e.target.value); onChange("synthese", e.target.value); }}
        placeholder="Rédigez ou générez automatiquement la synthèse du projet..."
        style={{ fontFamily: "monospace", fontSize: 13 }}
      />

      {/* Sections personnalisées */}
      {sections.map((s, i) => (
        <div key={i} className="pd-info-box" style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <input className="pd-input" value={s.titre} style={{ fontWeight: 700, fontSize: 15 }}
              onChange={e => setSections(prev => prev.map((x, j) => j === i ? { ...x, titre: e.target.value } : x))} />
            <button className="action-btn" onClick={() => setSections(prev => prev.filter((_, j) => j !== i))}>🗑️</button>
          </div>
          <textarea className="pd-input" rows={4} value={s.contenu}
            placeholder="Contenu de cette section..."
            onChange={e => setSections(prev => prev.map((x, j) => j === i ? { ...x, contenu: e.target.value } : x))} />
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Ajouté le {s.date}</div>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Tâches ────────────────────────────────────────────
function TabTaches({ projet }) {
  const [taches, setTaches] = useState(projet.taches || [
    { id: 1, titre: "Préparer le dossier", priorite: "Haute", statut: "En cours", echeance: "2026-03-10", assigne: projet.resp || "Admin" },
  ]);
  const [form, setForm] = useState({ titre: "", priorite: "Normale", statut: "À faire", echeance: "", assigne: "" });

  const add = () => {
    if (!form.titre) return;
    setTaches(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ titre: "", priorite: "Normale", statut: "À faire", echeance: "", assigne: "" });
  };

  const COLORS = { "Haute": "#ef4444", "Normale": "#f59e0b", "Basse": "#3b82f6" };
  const SCOLORS = { "En cours": "#3b82f6", "À faire": "#6b7280", "Terminé": "#10b981" };

  return (
    <div>
      <div className="pd-section-title">☑️ Tâches du projet</div>

      {/* Formulaire rapide */}
      <div className="pd-info-box" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 8, alignItems: "end" }}>
          <div className="field" style={{ margin: 0 }}>
            <label>Titre</label>
            <input className="pd-input" value={form.titre} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} placeholder="Nouvelle tâche..." />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Priorité</label>
            <select className="pd-input" value={form.priorite} onChange={e => setForm(p => ({ ...p, priorite: e.target.value }))}>
              <option>Haute</option><option>Normale</option><option>Basse</option>
            </select>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Assigné</label>
            <input className="pd-input" value={form.assigne} onChange={e => setForm(p => ({ ...p, assigne: e.target.value }))} placeholder="Nom..." />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Échéance</label>
            <input type="date" className="pd-input" value={form.echeance} onChange={e => setForm(p => ({ ...p, echeance: e.target.value }))} />
          </div>
          <button className="btn" style={{ marginBottom: 0 }} onClick={add}>＋</button>
        </div>
      </div>

      {taches.map(t => (
        <div key={t.id} className="pd-tache-row">
          <button className="action-btn" onClick={() => setTaches(prev => prev.map(x => x.id === t.id ? { ...x, statut: "Terminé" } : x))}>
            {t.statut === "Terminé" ? "✅" : "⬜"}
          </button>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, textDecoration: t.statut === "Terminé" ? "line-through" : "none", color: t.statut === "Terminé" ? "var(--text-muted)" : "var(--text-primary)" }}>
              {t.titre}
            </span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS[t.priorite], background: COLORS[t.priorite] + "22", padding: "2px 8px", borderRadius: 10 }}>{t.priorite}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: SCOLORS[t.statut], background: SCOLORS[t.statut] + "22", padding: "2px 8px", borderRadius: 10 }}>{t.statut}</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.assigne}</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.echeance}</span>
          <button className="action-btn" onClick={() => setTaches(prev => prev.filter(x => x.id !== t.id))}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Comptabilité ──────────────────────────────────────
function TabComptabilite({ projet }) {
  const [factures, setFactures] = useState(projet.factures || [
    { id: "FAC-001", label: "Acompte 50%", montant: projet.montant ? projet.montant / 2 : 0, statut: "En attente", date: new Date().toISOString().slice(0, 10) },
  ]);
  const [form, setForm] = useState({ label: "", montant: "", statut: "En attente", date: "" });
  const total = factures.reduce((a, f) => a + Number(f.montant), 0);
  const paye  = factures.filter(f => f.statut === "Payée").reduce((a, f) => a + Number(f.montant), 0);

  const add = () => {
    if (!form.label) return;
    const id = "FAC-00" + (factures.length + 1);
    setFactures(prev => [...prev, { ...form, id, date: form.date || new Date().toISOString().slice(0, 10) }]);
    setForm({ label: "", montant: "", statut: "En attente", date: "" });
  };

  return (
    <div>
      <div className="pd-section-title">🧾 Comptabilité du projet</div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Total HT", val: total.toLocaleString() + " €", color: "var(--primary)" },
          { label: "Payé", val: paye.toLocaleString() + " €", color: "var(--success)" },
          { label: "Reste à payer", val: (total - paye).toLocaleString() + " €", color: "var(--warning)" },
        ].map(s => (
          <div key={s.label} className="pd-info-box" style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div className="pd-info-box" style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 8, alignItems: "end" }}>
          <div className="field" style={{ margin: 0 }}>
            <label>Libellé</label>
            <input className="pd-input" value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} placeholder="Ex: Acompte, Solde..." />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Montant €</label>
            <input type="number" className="pd-input" value={form.montant} onChange={e => setForm(p => ({ ...p, montant: e.target.value }))} />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Statut</label>
            <select className="pd-input" value={form.statut} onChange={e => setForm(p => ({ ...p, statut: e.target.value }))}>
              <option>En attente</option><option>Payée</option><option>En retard</option>
            </select>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Date</label>
            <input type="date" className="pd-input" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
          </div>
          <button className="btn" onClick={add}>＋</button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead><tr style={{ borderBottom: "2px solid var(--border)" }}>
          {["N°", "Libellé", "Montant", "Statut", "Date", "Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: "var(--text-secondary)", fontWeight: 700 }}>{h}</th>)}
        </tr></thead>
        <tbody>{factures.map(fc => {
          const sc = { "Payée": "#10b981", "En attente": "#f59e0b", "En retard": "#ef4444" }[fc.statut] || "#6b7280";
          return (
            <tr key={fc.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "10px", color: "var(--primary)", fontWeight: 700 }}>{fc.id}</td>
              <td style={{ padding: "10px", fontWeight: 600 }}>{fc.label}</td>
              <td style={{ padding: "10px", fontWeight: 800, color: "var(--success)" }}>{Number(fc.montant).toLocaleString()} €</td>
              <td style={{ padding: "10px" }}><span style={{ background: sc + "22", color: sc, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{fc.statut}</span></td>
              <td style={{ padding: "10px", color: "var(--text-muted)", fontSize: 12 }}>{fc.date}</td>
              <td style={{ padding: "10px" }}>
                {fc.statut !== "Payée" && <button className="action-btn" onClick={() => setFactures(prev => prev.map(x => x.id === fc.id ? { ...x, statut: "Payée" } : x))} title="Marquer payée">💰</button>}
                <button className="action-btn" onClick={() => setFactures(prev => prev.filter(x => x.id !== fc.id))}>🗑️</button>
              </td>
            </tr>
          );
        })}</tbody>
      </table>
    </div>
  );
}

// ── Tab: Documents ─────────────────────────────────────────
function TabDocuments({ projet }) {
  const [docs, setDocs] = useState(projet.documents || [
    { id: 1, nom: "Devis_" + projet.client + ".pdf", type: "PDF", date: "2026-03-01", taille: "245 Ko" },
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="pd-section-title" style={{ margin: 0 }}>📄 Documents Client</div>
        <button className="btn sm">📎 Ajouter un document</button>
      </div>
      {docs.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Aucun document</div>}
      {docs.map(d => (
        <div key={d.id} className="pd-doc-row">
          <span style={{ fontSize: 24 }}>{d.type === "PDF" ? "📄" : "📎"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{d.nom}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{d.date} · {d.taille}</div>
          </div>
          <button className="btn sm outline">⬇️ Télécharger</button>
          <button className="action-btn" onClick={() => setDocs(prev => prev.filter(x => x.id !== d.id))}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  COMPOSANT PRINCIPAL — ProjetDetail
// ══════════════════════════════════════════════════════════════
export default function ProjetDetail({ projet: initialProjet, onClose, onSave }) {
  const [projet, setProjet] = useState(initialProjet);
  const [tab, setTab] = useState("informations");
  const [saved, setSaved] = useState(false);

  const onChange = (key, value) => {
    setProjet(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(projet);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS = [
    { id: "informations", label: "Informations" },
    { id: "assignation",  label: "Assignation" },
    { id: "avancement",   label: "Avancement" },
    { id: "taches",       label: "☑️ Tâches" },
    { id: "comptabilite", label: "🧾 Comptabilité" },
    { id: "synthese",     label: "📝 Synthèse" },
    { id: "documents",    label: "📄 Documents" },
  ];

  return (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-modal" onClick={e => e.stopPropagation()}>

        {/* Header orange — NOM CLIENT FIXE */}
        <div className="pd-header">
          <div className="pd-header-title">
            <span className="pd-header-num">{projet.id} —</span>
            <span className="pd-header-client">{projet.client}</span>
            {projet.adresse && <span className="pd-header-addr">| {projet.adresse}</span>}
          </div>
          <button className="pd-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`pd-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Bouton enregistrer */}
        <div className="pd-save-bar">
          <button className="pd-save-btn" onClick={handleSave}>
            {saved ? "✅ Enregistré!" : "💾 Enregistrer les modifications"}
          </button>
        </div>

        {/* Contenu */}
        <div className="pd-body">
          {tab === "informations" && <TabInformations projet={projet} onChange={onChange} />}
          {tab === "assignation"  && <TabAssignation  projet={projet} onChange={onChange} />}
          {tab === "avancement"   && <TabAvancement   projet={projet} onChange={onChange} />}
          {tab === "taches"       && <TabTaches       projet={projet} />}
          {tab === "comptabilite" && <TabComptabilite projet={projet} />}
          {tab === "synthese"     && <TabSynthese     projet={projet} onChange={onChange} />}
          {tab === "documents"    && <TabDocuments    projet={projet} />}
        </div>

        {/* Footer */}
        <div className="pd-footer">
          <button className="btn danger sm" onClick={() => { if(window.confirm("Archiver ce projet?")) onClose(); }}>
            🗃️ Archiver le projet
          </button>
          <button className="btn outline sm" onClick={onClose}>
            ↩️ Revenir en opportunité
          </button>
        </div>

      </div>
    </div>
  );
}