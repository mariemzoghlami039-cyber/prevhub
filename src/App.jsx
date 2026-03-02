import { useState } from "react";
import "./App.css";

// ══════════════════════════════════════════════════════════════
//  MOCK DATA
// ══════════════════════════════════════════════════════════════

const MOCK_PROJETS = [
  { id: 1, nom: "POLY91", client: "POLY91", statut: "Devis accepté", montant: 12400, date: "2026-02-28", resp: "Karim B." },
  { id: 2, nom: "SAS IKAI", client: "SAS IKAI", statut: "Réalisation pièces écrites", montant: 8750, date: "2026-02-20", resp: "Amira T." },
  { id: 3, nom: "France Terre d'Asile", client: "France Terre d'Asile", statut: "Devis accepté", montant: 15200, date: "2026-02-15", resp: "Nadia K." },
  { id: 4, nom: "Mairie de Lyon", client: "Mairie de Lyon", statut: "En cours", montant: 9500, date: "2026-01-30", resp: "Omar S." },
  { id: 5, nom: "ACME Corp", client: "ACME Corp", statut: "Terminé", montant: 22000, date: "2026-01-10", resp: "Leila M." },
  { id: 6, nom: "BioTech Solutions", client: "BioTech Solutions", statut: "En brouillon", montant: 5000, date: "2026-03-01", resp: "Karim B." },
];

const MOCK_USERS = [
  { id: 1, nom: "Admin Principal", email: "admin@preveris.pro", role: "Administrateur", actif: true, dateInscription: "2025-01-01" },
  { id: 2, nom: "Karim Benzara", email: "karim@preveris.pro", role: "Chargé d'affaires", actif: true, dateInscription: "2025-03-15" },
  { id: 3, nom: "Amira Touati", email: "amira@preveris.pro", role: "Consultant", actif: true, dateInscription: "2025-04-10" },
  { id: 4, nom: "Nadia Khalil", email: "nadia@preveris.pro", role: "Chargé d'affaires", actif: false, dateInscription: "2025-05-20" },
  { id: 5, nom: "Omar Saïdi", email: "omar@preveris.pro", role: "Consultant", actif: true, dateInscription: "2025-06-01" },
];

const MOCK_LEADS = [
  { id: 1, nom: "Entreprise Alpha", contact: "M. Dupont", email: "dupont@alpha.fr", source: "Site web", statut: "Nouveau", date: "2026-03-01" },
  { id: 2, nom: "Groupe Beta", contact: "Mme Martin", email: "martin@beta.fr", source: "Référence", statut: "Contacté", date: "2026-02-25" },
  { id: 3, nom: "PME Gamma", contact: "M. Leroy", email: "leroy@gamma.fr", source: "LinkedIn", statut: "Qualifié", date: "2026-02-20" },
];

const MOCK_CANDIDATURES = [
  { id: 1, poste: "Consultant Prévoyance", candidat: "Sophie L.", email: "sophie@email.fr", statut: "Entretien planifié", date: "2026-02-28" },
  { id: 2, poste: "Chargé d'affaires", candidat: "Rachid M.", email: "rachid@email.fr", statut: "CV reçu", date: "2026-02-26" },
  { id: 3, poste: "Assistant Admin", candidat: "Emma V.", email: "emma@email.fr", statut: "Refusé", date: "2026-02-20" },
];

const MOCK_EFFECTIFS = [
  { id: 1, nom: "Karim Benzara", poste: "Chargé d'affaires", dept: "Commercial", salaire: 3800, dateEntree: "2023-03-15", contrat: "CDI" },
  { id: 2, nom: "Amira Touati", poste: "Consultant Senior", dept: "Technique", salaire: 4200, dateEntree: "2023-04-10", contrat: "CDI" },
  { id: 3, nom: "Nadia Khalil", poste: "Consultant", dept: "Technique", salaire: 3400, dateEntree: "2023-05-20", contrat: "CDD" },
  { id: 4, nom: "Omar Saïdi", poste: "Consultant", dept: "Technique", salaire: 3500, dateEntree: "2023-06-01", contrat: "CDI" },
  { id: 5, nom: "Leila Mansouri", poste: "Responsable Admin", dept: "Administration", salaire: 3900, dateEntree: "2022-01-15", contrat: "CDI" },
];

const MOCK_TACHES = [
  { id: 1, titre: "Finaliser dossier POLY91", projet: "POLY91", priorite: "Haute", statut: "En cours", echeance: "2026-03-05", assigne: "Karim B." },
  { id: 2, titre: "Réunion client SAS IKAI", projet: "SAS IKAI", priorite: "Haute", statut: "À faire", echeance: "2026-03-03", assigne: "Amira T." },
  { id: 3, titre: "Rédaction rapport mensuel", projet: "Interne", priorite: "Normale", statut: "En cours", echeance: "2026-03-10", assigne: "Admin" },
  { id: 4, titre: "Mise à jour CGV", projet: "Interne", priorite: "Basse", statut: "À faire", echeance: "2026-03-15", assigne: "Leila M." },
  { id: 5, titre: "Prospection nouveaux clients", projet: "Commercial", priorite: "Normale", statut: "Terminé", echeance: "2026-02-28", assigne: "Omar S." },
];

const MOCK_EMAILS = [
  { id: 1, de: "karim@preveris.pro", a: "client@poly91.fr", sujet: "Devis POLY91 - Prévoyance collective", date: "2026-03-01", lu: true },
  { id: 2, de: "amira@preveris.pro", a: "contact@sasikai.fr", sujet: "Documents réalisation SAS IKAI", date: "2026-02-28", lu: false },
  { id: 3, de: "admin@preveris.pro", a: "rh@franceterreasile.org", sujet: "Nouveau projet prévoyance", date: "2026-02-25", lu: true },
  { id: 4, de: "info@alpha.fr", a: "admin@preveris.pro", sujet: "Demande de devis - Prévoyance", date: "2026-02-22", lu: false },
];

// ── COMPTES BANCAIRES (multi-compte)
const MOCK_COMPTES = [
  { id: 1, nom: "Compte Principal", banque: "BNP Paribas", iban: "FR76 3000 4028 ...", solde: 84320, couleur: "#e85d26" },
  { id: 2, nom: "Compte Opérationnel", banque: "Crédit Agricole", iban: "FR76 1820 6000 ...", solde: 22150, couleur: "#3b82f6" },
  { id: 3, nom: "Compte Épargne Pro", banque: "Société Générale", iban: "FR76 3003 0000 ...", solde: 45000, couleur: "#10b981" },
];

const MOCK_FACTURES = [
  { id: "FAC-2026-001", client: "POLY91", montant: 12400, statut: "Payée", date: "2026-02-01", echeance: "2026-03-01", compte: 1 },
  { id: "FAC-2026-002", client: "SAS IKAI", montant: 8750, statut: "En attente", date: "2026-02-15", echeance: "2026-03-15", compte: 1 },
  { id: "FAC-2026-003", client: "France Terre d'Asile", montant: 15200, statut: "En retard", date: "2026-01-15", echeance: "2026-02-15", compte: 2 },
  { id: "FAC-2026-004", client: "ACME Corp", montant: 22000, statut: "Payée", date: "2026-01-10", echeance: "2026-02-10", compte: 1 },
  { id: "FAC-2026-005", client: "Mairie de Lyon", montant: 9500, statut: "En attente", date: "2026-02-20", echeance: "2026-03-20", compte: 2 },
];

// ══════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════

const STATUT_COLORS = {
  "Devis accepté": "#10b981",
  "Réalisation pièces écrites": "#8b5cf6",
  "En cours": "#3b82f6",
  "Terminé": "#059669",
  "En brouillon": "#6b7280",
  "Nouveau": "#3b82f6",
  "Contacté": "#f59e0b",
  "Qualifié": "#10b981",
  "Entretien planifié": "#8b5cf6",
  "CV reçu": "#3b82f6",
  "Refusé": "#ef4444",
  "Accepté": "#10b981",
  "Payée": "#10b981",
  "En attente": "#f59e0b",
  "En retard": "#ef4444",
  "À faire": "#6b7280",
  "Haute": "#ef4444",
  "Normale": "#f59e0b",
  "Basse": "#3b82f6",
  "CDI": "#10b981",
  "CDD": "#f59e0b",
  "Stage": "#8b5cf6",
  "Alternance": "#3b82f6",
  "Commercial": "#e85d26",
  "Technique": "#3b82f6",
  "Administration": "#8b5cf6",
  "Direction": "#10b981",
  "Administrateur": "#e85d26",
  "Consultant": "#3b82f6",
  "Chargé d'affaires": "#8b5cf6",
  "Assistant": "#6b7280",
};

const statColor = (s) => STATUT_COLORS[s] || "#6b7280";

const today = () => new Date().toISOString().slice(0, 10);

// ══════════════════════════════════════════════════════════════
//  REUSABLE COMPONENTS
// ══════════════════════════════════════════════════════════════

function Badge({ label }) {
  const c = statColor(label);
  return (
    <span className="badge" style={{ background: c + "22", color: c, border: `1px solid ${c}44` }}>
      {label}
    </span>
  );
}

function Card({ children, className = "", style = {} }) {
  return <div className={`card ${className}`} style={style}>{children}</div>;
}

function Btn({ children, onClick, outline = false, small = false, danger = false, type = "button" }) {
  let cls = "btn";
  if (outline) cls += " outline";
  if (small) cls += " sm";
  if (danger) cls += " danger";
  return <button type={type} className={cls} onClick={onClick}>{children}</button>;
}

function Field({ label, value, onChange, type = "text", options, rows }) {
  return (
    <div className="field">
      <label>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : rows ? (
        <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <Card className="stat-card">
      <div className="stat-icon-label">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value" style={{ color }}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </Card>
  );
}

function SectionTitle({ icon, children }) {
  return <h3 className="section-title"><span>{icon}</span>{children}</h3>;
}

// ══════════════════════════════════════════════════════════════
//  PAGES
// ══════════════════════════════════════════════════════════════

// ── DASHBOARD ──────────────────────────────────────────────
function Dashboard({ setPage }) {
  return (
    <div>
      <div className="stat-cards">
        <StatCard icon="📁" label="Missions Actives" value="30" sub="+36 en brouillon" color="var(--primary)" />
        <StatCard icon="👥" label="Utilisateurs" value="51" sub="Tous rôles confondus" color="var(--purple)" />
        <StatCard icon="✅" label="Validations" value="0" sub="En attente" color="var(--warning)" />
        <StatCard icon="💰" label="CA du Mois" value="58 350 €" sub="Factures payées" color="var(--success)" />
      </div>

      <div className="dashboard-grid">
        {/* Actions rapides */}
        <Card>
          <SectionTitle icon="⚡">Actions Rapides</SectionTitle>
          {[
            { icon: "＋", label: "Nouveau Projet", page: "projets" },
            { icon: "👤", label: "Nouvel Utilisateur", page: "utilisateurs" },
            { icon: "🧾", label: "Nouvelle Facture", page: "comptabilite" },
            { icon: "✉️", label: "Envoyer Email", page: "emails" },
            { icon: "📋", label: "Nouvelle Tâche", page: "taches" },
            { icon: "🎯", label: "Nouveau Lead CRM", page: "crm" },
          ].map(a => (
            <button key={a.label} className="action-item" onClick={() => setPage(a.page)}>
              <span className="action-icon">{a.icon}</span> {a.label}
            </button>
          ))}
        </Card>

        {/* Projets récents */}
        <Card>
          <SectionTitle icon="🕐">Projets Récents</SectionTitle>
          {MOCK_PROJETS.slice(0, 5).map(p => (
            <div key={p.id} className="recent-row">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.nom}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.client} · {p.resp}</div>
              </div>
              <Badge label={p.statut} />
            </div>
          ))}
        </Card>

        {/* Performance */}
        <Card>
          <SectionTitle icon="📈">Performance Système</SectionTitle>
          {[
            { label: "Uptime système", val: "99.9%", color: "var(--success)" },
            { label: "Utilisateurs actifs", val: "12", color: "var(--info)" },
            { label: "Projets terminés", val: "12", color: "var(--purple)" },
            { label: "Taux satisfaction", val: "4.8/5", color: "var(--warning)" },
            { label: "Factures en retard", val: "1", color: "var(--danger)" },
            { label: "Tâches en cours", val: "3", color: "var(--info)" },
          ].map(r => (
            <div key={r.label} className="perf-row">
              <span style={{ color: "var(--text-secondary)" }}>{r.label}</span>
              <span style={{ fontWeight: 800, color: r.color }}>{r.val}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── PROJETS ────────────────────────────────────────────────
function ProjetsPage() {
  const [projets, setProjets] = useState(MOCK_PROJETS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const openNew = () => {
    setForm({ nom: "", client: "", statut: "En brouillon", montant: "", resp: "" });
    setModal("new");
  };
  const openEdit = (p) => { setForm(p); setModal("edit"); };

  const save = () => {
    if (modal === "new") setProjets(prev => [...prev, { ...form, id: Date.now(), date: today() }]);
    else setProjets(prev => prev.map(p => p.id === form.id ? form : p));
    setModal(null);
  };

  const del = (id) => setProjets(prev => prev.filter(p => p.id !== id));

  const STATUTS = ["En brouillon", "Devis accepté", "En cours", "Réalisation pièces écrites", "Terminé"];

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📁 Projets <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>({projets.length})</span></h2>
        <Btn onClick={openNew}>＋ Nouveau Projet</Btn>
      </div>
      <Card>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {["Projet", "Client", "Statut", "Montant", "Responsable", "Date", "Actions"].map(h =>
                  <th key={h}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {projets.map(p => (
                <tr key={p.id}>
                  <td className="td-name">{p.nom}</td>
                  <td className="td-muted">{p.client}</td>
                  <td><Badge label={p.statut} /></td>
                  <td className="td-money">{Number(p.montant).toLocaleString()} €</td>
                  <td className="td-muted">{p.resp}</td>
                  <td className="td-tiny">{p.date}</td>
                  <td>
                    <button className="action-btn" onClick={() => openEdit(p)} title="Modifier">✏️</button>
                    <button className="action-btn" onClick={() => del(p.id)} title="Supprimer">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouveau Projet" : "Modifier Projet"} onClose={() => setModal(null)}>
          <Field label="Nom du projet" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Client" value={form.client || ""} onChange={f("client")} />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={STATUTS} />
          <Field label="Montant (€)" value={form.montant || ""} onChange={f("montant")} type="number" />
          <Field label="Responsable" value={form.resp || ""} onChange={f("resp")} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── UTILISATEURS ───────────────────────────────────────────
function UtilisateursPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const openNew = () => { setForm({ nom: "", email: "", role: "Consultant", actif: true }); setModal("new"); };
  const save = () => {
    if (modal === "new") setUsers(prev => [...prev, { ...form, id: Date.now(), dateInscription: today() }]);
    else setUsers(prev => prev.map(u => u.id === form.id ? form : u));
    setModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">👥 Utilisateurs <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>({users.length})</span></h2>
        <Btn onClick={openNew}>＋ Nouvel Utilisateur</Btn>
      </div>
      <Card>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Nom", "Email", "Rôle", "Statut", "Inscription", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="td-name">{u.nom}</td>
                  <td className="td-link">{u.email}</td>
                  <td><Badge label={u.role} /></td>
                  <td>
                    <span style={{ color: u.actif ? "var(--success)" : "var(--danger)", fontWeight: 700, fontSize: 13 }}>
                      {u.actif ? "● Actif" : "● Inactif"}
                    </span>
                  </td>
                  <td className="td-tiny">{u.dateInscription}</td>
                  <td>
                    <button className="action-btn" onClick={() => { setForm(u); setModal("edit"); }}>✏️</button>
                    <button className="action-btn" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvel Utilisateur" : "Modifier Utilisateur"} onClose={() => setModal(null)}>
          <Field label="Nom complet" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Email" value={form.email || ""} onChange={f("email")} type="email" />
          <Field label="Rôle" value={form.role || ""} onChange={f("role")} options={["Administrateur", "Chargé d'affaires", "Consultant", "Assistant"]} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── CRM ────────────────────────────────────────────────────
function CRMPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (modal === "new") setLeads(prev => [...prev, { ...form, id: Date.now(), date: today() }]);
    else setLeads(prev => prev.map(l => l.id === form.id ? form : l));
    setModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🎯 CRM — Leads</h2>
        <Btn onClick={() => { setForm({ nom: "", contact: "", email: "", source: "Site web", statut: "Nouveau" }); setModal("new"); }}>＋ Nouveau Lead</Btn>
      </div>

      <div className="stat-cards" style={{ marginBottom: 20 }}>
        {["Nouveau", "Contacté", "Qualifié"].map(s => (
          <Card key={s} className="stat-card">
            <div className="stat-label">{s}</div>
            <div className="stat-value" style={{ color: statColor(s) }}>
              {leads.filter(l => l.statut === s).length}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Entreprise", "Contact", "Email", "Source", "Statut", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.id}>
                  <td className="td-name">{l.nom}</td>
                  <td className="td-muted">{l.contact}</td>
                  <td className="td-link">{l.email}</td>
                  <td className="td-muted">{l.source}</td>
                  <td><Badge label={l.statut} /></td>
                  <td className="td-tiny">{l.date}</td>
                  <td>
                    <button className="action-btn" onClick={() => { setForm(l); setModal("edit"); }}>✏️</button>
                    <button className="action-btn" onClick={() => setLeads(prev => prev.filter(x => x.id !== l.id))}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouveau Lead" : "Modifier Lead"} onClose={() => setModal(null)}>
          <Field label="Entreprise" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Contact" value={form.contact || ""} onChange={f("contact")} />
          <Field label="Email" value={form.email || ""} onChange={f("email")} type="email" />
          <Field label="Source" value={form.source || ""} onChange={f("source")} options={["Site web", "Référence", "LinkedIn", "Téléphone", "Salon"]} />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["Nouveau", "Contacté", "Qualifié"]} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TÂCHES ─────────────────────────────────────────────────
function TachesPage() {
  const [taches, setTaches] = useState(MOCK_TACHES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (modal === "new") setTaches(prev => [...prev, { ...form, id: Date.now() }]);
    else setTaches(prev => prev.map(t => t.id === form.id ? form : t));
    setModal(null);
  };

  const done = (id) => setTaches(prev => prev.map(t => t.id === id ? { ...t, statut: "Terminé" } : t));

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">✅ Gestionnaire de Tâches</h2>
        <Btn onClick={() => { setForm({ titre: "", projet: "", priorite: "Normale", statut: "À faire", echeance: "", assigne: "" }); setModal("new"); }}>＋ Nouvelle Tâche</Btn>
      </div>
      <Card>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Tâche", "Projet", "Priorité", "Statut", "Échéance", "Assigné", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {taches.map(t => (
                <tr key={t.id}>
                  <td className="td-name">{t.titre}</td>
                  <td className="td-muted">{t.projet}</td>
                  <td><Badge label={t.priorite} /></td>
                  <td><Badge label={t.statut} /></td>
                  <td className="td-tiny">{t.echeance}</td>
                  <td className="td-muted">{t.assigne}</td>
                  <td>
                    {t.statut !== "Terminé" && <button className="action-btn" onClick={() => done(t.id)} title="Marquer terminé">✅</button>}
                    <button className="action-btn" onClick={() => { setForm(t); setModal("edit"); }}>✏️</button>
                    <button className="action-btn" onClick={() => setTaches(prev => prev.filter(x => x.id !== t.id))}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvelle Tâche" : "Modifier Tâche"} onClose={() => setModal(null)}>
          <Field label="Titre" value={form.titre || ""} onChange={f("titre")} />
          <Field label="Projet" value={form.projet || ""} onChange={f("projet")} />
          <Field label="Priorité" value={form.priorite || ""} onChange={f("priorite")} options={["Haute", "Normale", "Basse"]} />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["À faire", "En cours", "Terminé"]} />
          <Field label="Assigné à" value={form.assigne || ""} onChange={f("assigne")} />
          <Field label="Échéance" value={form.echeance || ""} onChange={f("echeance")} type="date" />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── COMPTABILITÉ (multi-compte) ────────────────────────────
function ComptabilitePage() {
  const [comptes] = useState(MOCK_COMPTES);
  const [compteActif, setCompteActif] = useState(1);
  const [factures, setFactures] = useState(MOCK_FACTURES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const cActif = comptes.find(c => c.id === compteActif);
  const facturesDuCompte = factures.filter(fc => fc.compte === compteActif);
  const totalPaye = facturesDuCompte.filter(fc => fc.statut === "Payée").reduce((a, fc) => a + Number(fc.montant), 0);
  const totalAttente = facturesDuCompte.filter(fc => fc.statut !== "Payée").reduce((a, fc) => a + Number(fc.montant), 0);

  const save = () => {
    const id = "FAC-2026-00" + (factures.length + 1);
    if (modal === "new") setFactures(prev => [...prev, { ...form, id, date: today(), compte: compteActif }]);
    else setFactures(prev => prev.map(fc => fc.id === form.id ? form : fc));
    setModal(null);
  };

  const marquerPayee = (id) => setFactures(prev => prev.map(fc => fc.id === id ? { ...fc, statut: "Payée" } : fc));

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🧾 Comptabilité</h2>
        <Btn onClick={() => { setForm({ client: "", montant: "", statut: "En attente", echeance: "" }); setModal("new"); }}>＋ Nouvelle Facture</Btn>
      </div>

      {/* Sélecteur de comptes */}
      <div className="compte-switcher">
        {comptes.map(c => (
          <div key={c.id} className={`compte-card ${c.id === compteActif ? "selected" : ""}`}
            onClick={() => setCompteActif(c.id)}
            style={{ borderColor: c.id === compteActif ? c.couleur : undefined }}>
            <div className="compte-name" style={{ color: c.id === compteActif ? c.couleur : undefined }}>
              {c.nom}
            </div>
            <div className="compte-balance" style={{ color: c.couleur }}>
              {c.solde.toLocaleString()} €
            </div>
            <div className="compte-bank">{c.banque} · {c.iban}</div>
          </div>
        ))}
      </div>

      {/* Stats du compte actif */}
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="🏦" label={`Solde — ${cActif?.nom}`} value={cActif?.solde.toLocaleString() + " €"} color={cActif?.couleur} />
        <StatCard icon="✅" label="CA Encaissé" value={totalPaye.toLocaleString() + " €"} color="var(--success)" />
        <StatCard icon="⏳" label="En Attente" value={totalAttente.toLocaleString() + " €"} color="var(--warning)" />
        <StatCard icon="📄" label="Nb Factures" value={facturesDuCompte.length} color="var(--info)" />
      </div>

      <Card>
        <SectionTitle icon="📋">Factures — {cActif?.nom}</SectionTitle>
        <div className="table-wrap">
          <table>
            <thead><tr>{["N° Facture", "Client", "Montant", "Statut", "Date", "Échéance", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {facturesDuCompte.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 30, color: "var(--text-muted)" }}>Aucune facture pour ce compte</td></tr>
              )}
              {facturesDuCompte.map(fc => (
                <tr key={fc.id}>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{fc.id}</td>
                  <td className="td-name">{fc.client}</td>
                  <td className="td-money">{Number(fc.montant).toLocaleString()} €</td>
                  <td><Badge label={fc.statut} /></td>
                  <td className="td-tiny">{fc.date}</td>
                  <td className="td-tiny">{fc.echeance}</td>
                  <td>
                    {fc.statut !== "Payée" && <button className="action-btn" onClick={() => marquerPayee(fc.id)} title="Marquer payée">💰</button>}
                    <button className="action-btn" onClick={() => { setForm(fc); setModal("edit"); }}>✏️</button>
                    <button className="action-btn" onClick={() => setFactures(prev => prev.filter(x => x.id !== fc.id))}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvelle Facture" : "Modifier Facture"} onClose={() => setModal(null)}>
          <Field label="Client" value={form.client || ""} onChange={f("client")} />
          <Field label="Montant (€)" value={form.montant || ""} onChange={f("montant")} type="number" />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["En attente", "Payée", "En retard"]} />
          <Field label="Échéance" value={form.echeance || ""} onChange={f("echeance")} type="date" />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── EFFECTIFS ──────────────────────────────────────────────
function EffectifsPage() {
  const [effectifs, setEffectifs] = useState(MOCK_EFFECTIFS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (modal === "new") setEffectifs(prev => [...prev, { ...form, id: Date.now() }]);
    else setEffectifs(prev => prev.map(e => e.id === form.id ? form : e));
    setModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">👔 Effectifs <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>({effectifs.length})</span></h2>
        <Btn onClick={() => { setForm({ nom: "", poste: "", dept: "Commercial", salaire: "", dateEntree: "", contrat: "CDI" }); setModal("new"); }}>＋ Ajouter Employé</Btn>
      </div>
      <Card>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Nom", "Poste", "Département", "Salaire", "Contrat", "Date entrée", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {effectifs.map(e => (
                <tr key={e.id}>
                  <td className="td-name">{e.nom}</td>
                  <td className="td-muted">{e.poste}</td>
                  <td><Badge label={e.dept} /></td>
                  <td className="td-money">{Number(e.salaire).toLocaleString()} €</td>
                  <td><Badge label={e.contrat} /></td>
                  <td className="td-tiny">{e.dateEntree}</td>
                  <td>
                    <button className="action-btn" onClick={() => { setForm(e); setModal("edit"); }}>✏️</button>
                    <button className="action-btn" onClick={() => setEffectifs(prev => prev.filter(x => x.id !== e.id))}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Ajouter Employé" : "Modifier Employé"} onClose={() => setModal(null)}>
          <Field label="Nom complet" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Poste" value={form.poste || ""} onChange={f("poste")} />
          <Field label="Département" value={form.dept || ""} onChange={f("dept")} options={["Commercial", "Technique", "Administration", "Direction"]} />
          <Field label="Salaire (€/mois)" value={form.salaire || ""} onChange={f("salaire")} type="number" />
          <Field label="Type de contrat" value={form.contrat || ""} onChange={f("contrat")} options={["CDI", "CDD", "Stage", "Alternance"]} />
          <Field label="Date d'entrée" value={form.dateEntree || ""} onChange={f("dateEntree")} type="date" />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Ajouter" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── CANDIDATURES ───────────────────────────────────────────
function CandidaturesPage() {
  const [cands, setCands] = useState(MOCK_CANDIDATURES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (modal === "new") setCands(prev => [...prev, { ...form, id: Date.now(), date: today() }]);
    else setCands(prev => prev.map(c => c.id === form.id ? form : c));
    setModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📝 Candidatures</h2>
        <Btn onClick={() => { setForm({ poste: "", candidat: "", email: "", statut: "CV reçu" }); setModal("new"); }}>＋ Nouvelle Candidature</Btn>
      </div>
      <Card>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Poste", "Candidat", "Email", "Statut", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {cands.map(c => (
                <tr key={c.id}>
                  <td className="td-name">{c.poste}</td>
                  <td className="td-muted">{c.candidat}</td>
                  <td className="td-link">{c.email}</td>
                  <td><Badge label={c.statut} /></td>
                  <td className="td-tiny">{c.date}</td>
                  <td>
                    <button className="action-btn" onClick={() => { setForm(c); setModal("edit"); }}>✏️</button>
                    <button className="action-btn" onClick={() => setCands(prev => prev.filter(x => x.id !== c.id))}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvelle Candidature" : "Modifier"} onClose={() => setModal(null)}>
          <Field label="Poste" value={form.poste || ""} onChange={f("poste")} />
          <Field label="Candidat" value={form.candidat || ""} onChange={f("candidat")} />
          <Field label="Email" value={form.email || ""} onChange={f("email")} type="email" />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["CV reçu", "Entretien planifié", "Accepté", "Refusé"]} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── EMAILS ─────────────────────────────────────────────────
function EmailsPage() {
  const [emails, setEmails] = useState(MOCK_EMAILS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ a: "", sujet: "", corps: "" });

  const send = () => {
    setEmails(prev => [{ id: Date.now(), de: "admin@preveris.pro", a: form.a, sujet: form.sujet, date: today(), lu: true }, ...prev]);
    setModal(null);
  };

  const unread = emails.filter(e => !e.lu).length;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">✉️ Emails {unread > 0 && <span style={{ background: "var(--danger)", color: "#fff", borderRadius: 20, padding: "2px 9px", fontSize: 13, marginLeft: 8 }}>{unread} nouveaux</span>}</h2>
        <Btn onClick={() => { setForm({ a: "", sujet: "", corps: "" }); setModal("new"); }}>✉️ Envoyer Email</Btn>
      </div>
      <Card>
        {emails.map(e => (
          <div key={e.id} className={`email-row ${!e.lu ? "unread" : ""}`}
            onClick={() => setEmails(prev => prev.map(x => x.id === e.id ? { ...x, lu: true } : x))}>
            <div>
              <div className={`email-subject ${!e.lu ? "unread" : ""}`}>{e.sujet}</div>
              <div className="email-meta">De: {e.de} → À: {e.a}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {!e.lu && <span className="new-badge">Nouveau</span>}
              <span className="td-tiny">{e.date}</span>
              <button className="action-btn" onClick={(ev) => { ev.stopPropagation(); setEmails(prev => prev.filter(x => x.id !== e.id)); }}>🗑️</button>
            </div>
          </div>
        ))}
      </Card>

      {modal === "new" && (
        <Modal title="Envoyer un Email" onClose={() => setModal(null)}>
          <Field label="Destinataire" value={form.a} onChange={v => setForm(p => ({ ...p, a: v }))} type="email" />
          <Field label="Sujet" value={form.sujet} onChange={v => setForm(p => ({ ...p, sujet: v }))} />
          <Field label="Message" value={form.corps} onChange={v => setForm(p => ({ ...p, corps: v }))} rows={5} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={send}>Envoyer ✈️</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ANALYTICS ──────────────────────────────────────────────
function AnalyticsPage() {
  const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const ca = [18000, 22000, 15000, 28000, 31000, 25000, 19000, 22000, 35000, 41000, 38000, 58350];
  const maxCA = Math.max(...ca);

  return (
    <div>
      <h2 className="page-title" style={{ marginBottom: 20 }}>📊 Analytics</h2>
      <div className="stat-cards">
        <StatCard icon="📈" label="CA Annuel" value="352 350 €" color="var(--success)" />
        <StatCard icon="📁" label="Projets créés" value="42" sub="2025-2026" color="var(--info)" />
        <StatCard icon="👥" label="Nouveaux clients" value="18" sub="2025-2026" color="var(--purple)" />
        <StatCard icon="⭐" label="Satisfaction" value="4.8/5" color="var(--warning)" />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionTitle icon="📊">CA Mensuel 2025–2026</SectionTitle>
        <div className="bar-chart">
          {ca.map((v, i) => (
            <div key={i} className="bar-col">
              <span className="bar-val">{(v / 1000).toFixed(0)}k</span>
              <div className="bar"
                style={{
                  height: (v / maxCA * 160) + "px",
                  background: i === 11 ? "var(--primary)" : "var(--primary)44",
                }}
              />
              <span className="bar-label">{mois[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="analytics-grid">
        <Card>
          <SectionTitle icon="🏆">Top Projets par CA</SectionTitle>
          {[...MOCK_PROJETS].sort((a, b) => b.montant - a.montant).slice(0, 5).map(p => (
            <div key={p.id} className="perf-row">
              <span>{p.nom}</span>
              <span className="text-success" style={{ fontWeight: 800 }}>{Number(p.montant).toLocaleString()} €</span>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle icon="📉">Répartition par Statut</SectionTitle>
          {["Devis accepté", "En cours", "Terminé", "En brouillon"].map(s => {
            const cnt = MOCK_PROJETS.filter(p => p.statut === s).length;
            const pct = Math.round(cnt / MOCK_PROJETS.length * 100);
            return (
              <div key={s} className="progress-row">
                <div className="progress-info">
                  <span>{s}</span>
                  <span style={{ color: statColor(s), fontWeight: 700 }}>{cnt} ({pct}%)</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: pct + "%", background: statColor(s) }} />
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

// ── PLACEHOLDER ────────────────────────────────────────────
function PlaceholderPage({ title, icon }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">{icon}</div>
      <h2 className="placeholder-title">{title}</h2>
      <p className="placeholder-sub">Cette section sera bientôt disponible.</p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  NAV CONFIG
// ══════════════════════════════════════════════════════════════

const NAV1 = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "projets", label: "Projets", icon: "📁" },
  { id: "crm", label: "CRM", icon: "🎯" },
  { id: "suivi", label: "Suivi établissement", icon: "🏢" },
  { id: "emails", label: "Emails", icon: "✉️" },
  { id: "opportunites", label: "Opportunités", icon: "💡" },
  { id: "candidatures", label: "Candidatures", icon: "📝" },
  { id: "support", label: "Support", icon: "🎧" },
  { id: "validations", label: "Validations", icon: "✅" },
];
const NAV2 = [
  { id: "taches", label: "Gestionnaire de Tâches", icon: "☑️" },
  { id: "comptabilite", label: "Comptabilité", icon: "🧾" },
  { id: "independants", label: "Indépendants", icon: "🧑‍💼" },
  { id: "effectifs", label: "Effectifs", icon: "👔" },
  { id: "autorisations", label: "Autorisations", icon: "🔐" },
  { id: "sms", label: "SMS/WhatsApp", icon: "💬" },
  { id: "parametres", label: "Paramètres", icon: "⚙️" },
  { id: "campagnes", label: "Campagnes Drip", icon: "📧" },
];
const NAV3 = [
  { id: "attribution", label: "Attribution Leads", icon: "🎯" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "formulaires", label: "Formulaires Web", icon: "📋" },
  { id: "webhooks", label: "Webhooks & Intégrations", icon: "🔗" },
  { id: "ressources", label: "Ressources", icon: "📚" },
];

const ALL_NAV = [...NAV1, ...NAV2, ...NAV3];

// ══════════════════════════════════════════════════════════════
//  APP ROOT
// ══════════════════════════════════════════════════════════════

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [notifs] = useState(3);

  const toggleDark = () => setDark(d => !d);

  const renderPage = () => {
    switch (page) {
      case "dashboard":     return <Dashboard setPage={setPage} />;
      case "projets":       return <ProjetsPage />;
      case "utilisateurs":  return <UtilisateursPage />;
      case "crm":           return <CRMPage />;
      case "taches":        return <TachesPage />;
      case "comptabilite":  return <ComptabilitePage />;
      case "effectifs":     return <EffectifsPage />;
      case "candidatures":  return <CandidaturesPage />;
      case "emails":        return <EmailsPage />;
      case "analytics":     return <AnalyticsPage />;
      default:
        const nav = ALL_NAV.find(n => n.id === page);
        return <PlaceholderPage title={nav?.label || page} icon={nav?.icon || "🔧"} />;
    }
  };

  const NavRow = ({ items }) => (
    <div className="nav-row">
      {items.map(n => (
        <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
          <span>{n.icon}</span>{n.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className={dark ? "dark" : ""}>
      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="topbar-logo">
          <div className="logo-icon">P</div>
          <div>
            <div className="logo-text">Prev'Hub</div>
            <div className="logo-sub">PREVERIS</div>
          </div>
          <span className="admin-badge">Administrateur</span>
        </div>
        <div className="topbar-actions">
          <button className="icon-btn" onClick={toggleDark} title="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="icon-btn" title="Notifications">
            🔔
            {notifs > 0 && <span className="notif-dot">{notifs}</span>}
          </button>
          <div className="user-menu" onClick={() => setPage("parametres")}>
            <div className="avatar">A</div>
            <span className="user-name">admin</span>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="header-nav">
        <div className="header-brand">
          <div className="brand-logo">P</div>
          <div>
            <div className="brand-title">Dashboard Admin PREVERIS</div>
            <div className="brand-sub">Administration centrale de la plateforme</div>
          </div>
        </div>
        <div className="nav-rows">
          <NavRow items={NAV1} />
          <NavRow items={NAV2} />
          <NavRow items={NAV3} />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}
