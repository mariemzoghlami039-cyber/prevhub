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

const MOCK_OPPORTUNITES = [
  { id: 1, nom: "Groupe Santé Plus", contact: "M. Bernard", valeur: 45000, statut: "Proposition", proba: 70, echeance: "2026-04-01" },
  { id: 2, nom: "Tech Innov SA", contact: "Mme Petit", valeur: 28000, statut: "Négociation", proba: 85, echeance: "2026-03-15" },
  { id: 3, nom: "EduPro Formation", contact: "M. Garnier", valeur: 12000, statut: "Prospection", proba: 30, echeance: "2026-05-01" },
  { id: 4, nom: "LogiPack SARL", contact: "Mme Roux", valeur: 33000, statut: "Qualification", proba: 55, echeance: "2026-04-15" },
];

const MOCK_ETABLISSEMENTS = [
  { id: 1, nom: "POLY91", secteur: "Industrie", effectif: 120, contrat: "Prévoyance collective", statut: "Actif", dateDebut: "2024-01-01", resp: "Karim B." },
  { id: 2, nom: "SAS IKAI", secteur: "Commerce", effectif: 45, contrat: "Mutuelle santé", statut: "En cours", dateDebut: "2025-06-01", resp: "Amira T." },
  { id: 3, nom: "France Terre d'Asile", secteur: "Associatif", effectif: 230, contrat: "Prévoyance + Retraite", statut: "Actif", dateDebut: "2023-09-01", resp: "Nadia K." },
  { id: 4, nom: "Mairie de Lyon", secteur: "Public", effectif: 850, contrat: "Prévoyance collective", statut: "Actif", dateDebut: "2022-01-01", resp: "Omar S." },
];

const MOCK_SMS = [
  { id: 1, destinataire: "POLY91 - M. Dupont", numero: "+33 6 12 34 56 78", message: "Rappel: RDV le 05/03 à 14h pour signature contrat prévoyance.", statut: "Envoyé", date: "2026-03-01", canal: "SMS" },
  { id: 2, destinataire: "SAS IKAI - Mme Martin", numero: "+33 7 98 76 54 32", message: "Bonjour, vos documents sont prêts. Merci de les valider.", statut: "Livré", date: "2026-02-28", canal: "WhatsApp" },
  { id: 3, destinataire: "Groupe Beta", numero: "+33 6 55 44 33 22", message: "Votre devis a été accepté. Prochaines étapes en cours.", statut: "En attente", date: "2026-03-02", canal: "SMS" },
];

const MOCK_NOTIFS = [
  { id: 1, texte: "Nouveau lead: Groupe Beta vient de s'inscrire", type: "info", date: "2026-03-02 09:15", lu: false },
  { id: 2, texte: "Facture FAC-2026-003 est en retard de paiement", type: "danger", date: "2026-03-02 08:30", lu: false },
  { id: 3, texte: "Tâche 'Réunion client SAS IKAI' échéance demain", type: "warning", date: "2026-03-02 07:00", lu: false },
  { id: 4, texte: "Candidature de Sophie L. acceptée", type: "success", date: "2026-03-01 16:45", lu: true },
  { id: 5, texte: "Projet POLY91 passé en 'Devis accepté'", type: "success", date: "2026-03-01 14:20", lu: true },
];

const MOCK_AUTORISATIONS = [
  { role: "Administrateur", projets: true, crm: true, comptabilite: true, effectifs: true, autorisations: true, parametres: true },
  { role: "Chargé d'affaires", projets: true, crm: true, comptabilite: false, effectifs: false, autorisations: false, parametres: false },
  { role: "Consultant", projets: true, crm: false, comptabilite: false, effectifs: false, autorisations: false, parametres: false },
  { role: "Assistant", projets: false, crm: false, comptabilite: false, effectifs: false, autorisations: false, parametres: false },
];

const MOCK_SUPPORT = [
  { id: 1, sujet: "Impossible d'accéder à la page Comptabilité", utilisateur: "Karim B.", priorite: "Haute", statut: "En cours", date: "2026-03-01" },
  { id: 2, sujet: "Export PDF ne fonctionne pas", utilisateur: "Amira T.", priorite: "Normale", statut: "Ouvert", date: "2026-02-28" },
  { id: 3, sujet: "Erreur lors de l'envoi d'email", utilisateur: "Omar S.", priorite: "Basse", statut: "Résolu", date: "2026-02-25" },
];

const MOCK_CAMPAGNES = [
  { id: 1, nom: "Bienvenue nouveaux clients", statut: "Active", emails: 3, envoyes: 145, ouverts: 89, clics: 34, dateDebut: "2026-01-01" },
  { id: 2, nom: "Relance devis en attente", statut: "Active", emails: 2, envoyes: 67, ouverts: 41, clics: 18, dateDebut: "2026-02-01" },
  { id: 3, nom: "Newsletter mensuelle Mars", statut: "Brouillon", emails: 1, envoyes: 0, ouverts: 0, clics: 0, dateDebut: "2026-03-05" },
];

const MOCK_CALENDRIER = [
  { id: 1, titre: "RDV POLY91 - Signature contrat", date: "2026-03-05", heure: "14:00", type: "RDV Client", resp: "Karim B." },
  { id: 2, titre: "Réunion équipe hebdomadaire", date: "2026-03-03", heure: "09:00", type: "Interne", resp: "Admin" },
  { id: 3, titre: "Entretien Sophie L.", date: "2026-03-07", heure: "10:30", type: "RH", resp: "Leila M." },
  { id: 4, titre: "Présentation SAS IKAI", date: "2026-03-10", heure: "15:00", type: "RDV Client", resp: "Amira T." },
  { id: 5, titre: "Formation équipe commerciale", date: "2026-03-12", heure: "09:00", type: "Formation", resp: "Admin" },
];

const MOCK_PROFIL = {
  nom: "Mariem Zoghlami",
  email: "admin@preveris.pro",
  role: "Administrateur",
  telephone: "+216 97333006",
  poste: "Directrice Administrative",
  dateInscription: "2025-01-01",
  avatar: "M",
};

// ══════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════

const STATUT_COLORS = {
  "Devis accepté": "#10b981", "Réalisation pièces écrites": "#8b5cf6",
  "En cours": "#3b82f6", "Terminé": "#059669", "En brouillon": "#6b7280",
  "Nouveau": "#3b82f6", "Contacté": "#f59e0b", "Qualifié": "#10b981",
  "Entretien planifié": "#8b5cf6", "CV reçu": "#3b82f6", "Refusé": "#ef4444", "Accepté": "#10b981",
  "Payée": "#10b981", "En attente": "#f59e0b", "En retard": "#ef4444",
  "À faire": "#6b7280", "Haute": "#ef4444", "Normale": "#f59e0b", "Basse": "#3b82f6",
  "CDI": "#10b981", "CDD": "#f59e0b", "Stage": "#8b5cf6", "Alternance": "#3b82f6",
  "Commercial": "#e85d26", "Technique": "#3b82f6", "Administration": "#8b5cf6", "Direction": "#10b981",
  "Administrateur": "#e85d26", "Consultant": "#3b82f6", "Chargé d'affaires": "#8b5cf6", "Assistant": "#6b7280",
  "Actif": "#10b981", "Ouvert": "#3b82f6", "Résolu": "#059669",
  "Prospection": "#6b7280", "Qualification": "#3b82f6", "Proposition": "#f59e0b",
  "Négociation": "#8b5cf6", "Gagné": "#10b981", "Perdu": "#ef4444",
  "Envoyé": "#10b981", "Livré": "#059669",
  "Active": "#10b981", "Brouillon": "#6b7280", "Pausée": "#f59e0b",
  "RDV Client": "#e85d26", "Interne": "#3b82f6", "RH": "#8b5cf6", "Formation": "#10b981",
  "info": "#3b82f6", "danger": "#ef4444", "warning": "#f59e0b", "success": "#10b981",
};

const statColor = (s) => STATUT_COLORS[s] || "#6b7280";
const today = () => new Date().toISOString().slice(0, 10);

// ══════════════════════════════════════════════════════════════
//  REUSABLE COMPONENTS
// ══════════════════════════════════════════════════════════════

function Badge({ label }) {
  const c = statColor(label);
  return <span className="badge" style={{ background: c + "22", color: c, border: `1px solid ${c}44` }}>{label}</span>;
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

function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={wide ? { width: 700 } : {}} onClick={e => e.stopPropagation()}>
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

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)} style={{
      width: 44, height: 24, borderRadius: 12,
      background: checked ? "var(--primary)" : "var(--border)",
      position: "relative", cursor: "pointer", transition: "background 0.2s",
      flexShrink: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3, left: checked ? 23 : 3,
        transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  LOGIN PAGE
// ══════════════════════════════════════════════════════════════

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@preveris.pro");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@preveris.pro" && password === "admin123") {
        onLogin({ nom: "Mariem Zoghlami", email, role: "Administrateur", avatar: "M" });
      } else {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <div className="login-logo-icon">P</div>
          <div className="login-logo-text">Prev'Hub</div>
          <div className="login-logo-sub">PREVERIS — Administration</div>
        </div>

        <h2 className="login-title">Connexion</h2>
        <p className="login-sub">Connectez-vous à votre espace admin</p>

        {error && <div className="login-error">⚠️ {error}</div>}

        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <div className="field">
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter →"}
        </button>

        <div className="login-hint">
          <span>💡 Demo: admin@preveris.pro / admin123</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  NOTIFICATIONS PANEL
// ══════════════════════════════════════════════════════════════

function NotifPanel({ notifs, setNotifs, onClose }) {
  const markAll = () => setNotifs(prev => prev.map(n => ({ ...n, lu: true })));
  return (
    <div className="notif-panel" onClick={e => e.stopPropagation()}>
      <div className="notif-panel-header">
        <span style={{ fontWeight: 700 }}>🔔 Notifications</span>
        <button onClick={markAll} className="btn sm outline">Tout lire</button>
      </div>
      {notifs.map(n => (
        <div key={n.id} className={`notif-item ${!n.lu ? "unread" : ""}`}
          onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, lu: true } : x))}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18 }}>
              {n.type === "danger" ? "🔴" : n.type === "warning" ? "🟡" : n.type === "success" ? "🟢" : "🔵"}
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: n.lu ? 400 : 700, color: "var(--text-primary)" }}>{n.texte}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{n.date}</div>
            </div>
            {!n.lu && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", marginLeft: "auto", marginTop: 4, flexShrink: 0 }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SEARCH BAR
// ══════════════════════════════════════════════════════════════

function SearchBar({ setPage }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const ALL_ITEMS = [
    ...MOCK_PROJETS.map(p => ({ label: p.nom, sub: "Projet · " + p.statut, page: "projets", icon: "📁" })),
    ...MOCK_LEADS.map(l => ({ label: l.nom, sub: "Lead · " + l.statut, page: "crm", icon: "🎯" })),
    ...MOCK_USERS.map(u => ({ label: u.nom, sub: "Utilisateur · " + u.role, page: "utilisateurs", icon: "👥" })),
    ...MOCK_TACHES.map(t => ({ label: t.titre, sub: "Tâche · " + t.statut, page: "taches", icon: "✅" })),
    { label: "Dashboard", sub: "Page principale", page: "dashboard", icon: "📊" },
    { label: "Comptabilité", sub: "Factures & comptes", page: "comptabilite", icon: "🧾" },
    { label: "Analytics", sub: "Statistiques", page: "analytics", icon: "📈" },
  ];

  const results = q.length > 1 ? ALL_ITEMS.filter(i =>
    i.label.toLowerCase().includes(q.toLowerCase()) || i.sub.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 6) : [];

  return (
    <div className="search-wrap">
      <input className="search-input" placeholder="🔍 Rechercher..." value={q}
        onChange={e => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)} />
      {open && results.length > 0 && (
        <div className="search-results">
          {results.map((r, i) => (
            <div key={i} className="search-item" onClick={() => { setPage(r.page); setQ(""); setOpen(false); }}>
              <span style={{ fontSize: 16 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
        <Card>
          <SectionTitle icon="⚡">Actions Rapides</SectionTitle>
          {[
            { icon: "＋", label: "Nouveau Projet", page: "projets" },
            { icon: "👤", label: "Nouvel Utilisateur", page: "utilisateurs" },
            { icon: "🧾", label: "Nouvelle Facture", page: "comptabilite" },
            { icon: "✉️", label: "Envoyer Email", page: "emails" },
            { icon: "📋", label: "Nouvelle Tâche", page: "taches" },
            { icon: "💡", label: "Nouvelle Opportunité", page: "opportunites" },
            { icon: "📅", label: "Voir Calendrier", page: "calendrier" },
          ].map(a => (
            <button key={a.label} className="action-item" onClick={() => setPage(a.page)}>
              <span className="action-icon">{a.icon}</span>{a.label}
            </button>
          ))}
        </Card>
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
        <Card>
          <SectionTitle icon="📈">Performance Système</SectionTitle>
          {[
            { label: "Uptime système", val: "99.9%", color: "var(--success)" },
            { label: "Utilisateurs actifs", val: "12", color: "var(--info)" },
            { label: "Projets terminés", val: "12", color: "var(--purple)" },
            { label: "Taux satisfaction", val: "4.8/5", color: "var(--warning)" },
            { label: "Factures en retard", val: "1", color: "var(--danger)" },
            { label: "Opportunités en cours", val: "4", color: "var(--info)" },
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
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const STATUTS = ["En brouillon", "Devis accepté", "En cours", "Réalisation pièces écrites", "Terminé"];
  const save = () => {
    if (modal === "new") setProjets(prev => [...prev, { ...form, id: Date.now(), date: today() }]);
    else setProjets(prev => prev.map(p => p.id === form.id ? form : p));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📁 Projets <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>({projets.length})</span></h2>
        <Btn onClick={() => { setForm({ nom: "", client: "", statut: "En brouillon", montant: "", resp: "" }); setModal("new"); }}>＋ Nouveau Projet</Btn>
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Projet", "Client", "Statut", "Montant", "Responsable", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{projets.map(p => (
          <tr key={p.id}>
            <td className="td-name">{p.nom}</td>
            <td className="td-muted">{p.client}</td>
            <td><Badge label={p.statut} /></td>
            <td className="td-money">{Number(p.montant).toLocaleString()} €</td>
            <td className="td-muted">{p.resp}</td>
            <td className="td-tiny">{p.date}</td>
            <td>
              <button className="action-btn" onClick={() => { setForm(p); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setProjets(prev => prev.filter(x => x.id !== p.id))}>🗑️</button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>
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
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setUsers(prev => [...prev, { ...form, id: Date.now(), dateInscription: today() }]);
    else setUsers(prev => prev.map(u => u.id === form.id ? form : u));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">👥 Utilisateurs <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>({users.length})</span></h2>
        <Btn onClick={() => { setForm({ nom: "", email: "", role: "Consultant", actif: true }); setModal("new"); }}>＋ Nouvel Utilisateur</Btn>
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Nom", "Email", "Rôle", "Statut", "Inscription", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{users.map(u => (
          <tr key={u.id}>
            <td className="td-name">{u.nom}</td>
            <td className="td-link">{u.email}</td>
            <td><Badge label={u.role} /></td>
            <td><span style={{ color: u.actif ? "var(--success)" : "var(--danger)", fontWeight: 700, fontSize: 13 }}>{u.actif ? "● Actif" : "● Inactif"}</span></td>
            <td className="td-tiny">{u.dateInscription}</td>
            <td>
              <button className="action-btn" onClick={() => { setForm(u); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}>🗑️</button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>
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
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
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
            <div className="stat-value" style={{ color: statColor(s) }}>{leads.filter(l => l.statut === s).length}</div>
          </Card>
        ))}
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Entreprise", "Contact", "Email", "Source", "Statut", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{leads.map(l => (
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
        ))}</tbody>
      </table></div></Card>
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

// ── OPPORTUNITÉS ───────────────────────────────────────────
function OpportunitesPage() {
  const [opps, setOpps] = useState(MOCK_OPPORTUNITES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const totalPipeline = opps.reduce((a, o) => a + Number(o.valeur) * o.proba / 100, 0);
  const save = () => {
    if (modal === "new") setOpps(prev => [...prev, { ...form, id: Date.now() }]);
    else setOpps(prev => prev.map(o => o.id === form.id ? form : o));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">💡 Opportunités</h2>
        <Btn onClick={() => { setForm({ nom: "", contact: "", valeur: "", statut: "Prospection", proba: 20, echeance: "" }); setModal("new"); }}>＋ Nouvelle Opportunité</Btn>
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="💰" label="Pipeline Total" value={opps.reduce((a, o) => a + Number(o.valeur), 0).toLocaleString() + " €"} color="var(--primary)" />
        <StatCard icon="🎯" label="Pipeline Pondéré" value={Math.round(totalPipeline).toLocaleString() + " €"} color="var(--success)" />
        <StatCard icon="📊" label="Nb Opportunités" value={opps.length} color="var(--info)" />
        <StatCard icon="🔥" label="En Négociation" value={opps.filter(o => o.statut === "Négociation").length} color="var(--purple)" />
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Entreprise", "Contact", "Valeur", "Statut", "Probabilité", "Échéance", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{opps.map(o => (
          <tr key={o.id}>
            <td className="td-name">{o.nom}</td>
            <td className="td-muted">{o.contact}</td>
            <td className="td-money">{Number(o.valeur).toLocaleString()} €</td>
            <td><Badge label={o.statut} /></td>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 10 }}>
                  <div style={{ height: "100%", width: o.proba + "%", background: statColor(o.statut), borderRadius: 10 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: statColor(o.statut) }}>{o.proba}%</span>
              </div>
            </td>
            <td className="td-tiny">{o.echeance}</td>
            <td>
              <button className="action-btn" onClick={() => { setForm(o); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setOpps(prev => prev.filter(x => x.id !== o.id))}>🗑️</button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>
      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvelle Opportunité" : "Modifier"} onClose={() => setModal(null)}>
          <Field label="Entreprise" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Contact" value={form.contact || ""} onChange={f("contact")} />
          <Field label="Valeur estimée (€)" value={form.valeur || ""} onChange={f("valeur")} type="number" />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["Prospection", "Qualification", "Proposition", "Négociation", "Gagné", "Perdu"]} />
          <Field label="Probabilité (%)" value={form.proba || ""} onChange={f("proba")} type="number" />
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

// ── SUIVI ÉTABLISSEMENT ────────────────────────────────────
function SuiviPage() {
  const [etabs, setEtabs] = useState(MOCK_ETABLISSEMENTS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setEtabs(prev => [...prev, { ...form, id: Date.now() }]);
    else setEtabs(prev => prev.map(e => e.id === form.id ? form : e));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🏢 Suivi Établissements</h2>
        <Btn onClick={() => { setForm({ nom: "", secteur: "", effectif: "", contrat: "", statut: "En cours", dateDebut: "", resp: "" }); setModal("new"); }}>＋ Ajouter Établissement</Btn>
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="🏢" label="Total Établissements" value={etabs.length} color="var(--primary)" />
        <StatCard icon="✅" label="Actifs" value={etabs.filter(e => e.statut === "Actif").length} color="var(--success)" />
        <StatCard icon="👥" label="Total Effectifs" value={etabs.reduce((a, e) => a + Number(e.effectif), 0)} color="var(--purple)" />
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Établissement", "Secteur", "Effectif", "Contrat", "Statut", "Depuis", "Resp.", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{etabs.map(e => (
          <tr key={e.id}>
            <td className="td-name">{e.nom}</td>
            <td className="td-muted">{e.secteur}</td>
            <td style={{ fontWeight: 600 }}>{e.effectif}</td>
            <td className="td-muted">{e.contrat}</td>
            <td><Badge label={e.statut} /></td>
            <td className="td-tiny">{e.dateDebut}</td>
            <td className="td-muted">{e.resp}</td>
            <td>
              <button className="action-btn" onClick={() => { setForm(e); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setEtabs(prev => prev.filter(x => x.id !== e.id))}>🗑️</button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>
      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Ajouter Établissement" : "Modifier"} onClose={() => setModal(null)}>
          <Field label="Nom" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Secteur" value={form.secteur || ""} onChange={f("secteur")} options={["Industrie", "Commerce", "Associatif", "Public", "Services", "Santé"]} />
          <Field label="Effectif" value={form.effectif || ""} onChange={f("effectif")} type="number" />
          <Field label="Type de contrat" value={form.contrat || ""} onChange={f("contrat")} />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["Actif", "En cours", "Suspendu", "Résilié"]} />
          <Field label="Date de début" value={form.dateDebut || ""} onChange={f("dateDebut")} type="date" />
          <Field label="Responsable" value={form.resp || ""} onChange={f("resp")} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Ajouter" : "Enregistrer"}</Btn>
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
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setTaches(prev => [...prev, { ...form, id: Date.now() }]);
    else setTaches(prev => prev.map(t => t.id === form.id ? form : t));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">✅ Gestionnaire de Tâches</h2>
        <Btn onClick={() => { setForm({ titre: "", projet: "", priorite: "Normale", statut: "À faire", echeance: "", assigne: "" }); setModal("new"); }}>＋ Nouvelle Tâche</Btn>
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Tâche", "Projet", "Priorité", "Statut", "Échéance", "Assigné", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{taches.map(t => (
          <tr key={t.id}>
            <td className="td-name">{t.titre}</td>
            <td className="td-muted">{t.projet}</td>
            <td><Badge label={t.priorite} /></td>
            <td><Badge label={t.statut} /></td>
            <td className="td-tiny">{t.echeance}</td>
            <td className="td-muted">{t.assigne}</td>
            <td>
              {t.statut !== "Terminé" && <button className="action-btn" onClick={() => setTaches(prev => prev.map(x => x.id === t.id ? { ...x, statut: "Terminé" } : x))} title="Terminé">✅</button>}
              <button className="action-btn" onClick={() => { setForm(t); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setTaches(prev => prev.filter(x => x.id !== t.id))}>🗑️</button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>
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

// ── COMPTABILITÉ ───────────────────────────────────────────
function ComptabilitePage() {
  const [comptes] = useState(MOCK_COMPTES);
  const [compteActif, setCompteActif] = useState(1);
  const [factures, setFactures] = useState(MOCK_FACTURES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const cActif = comptes.find(c => c.id === compteActif);
  const fDuCompte = factures.filter(fc => fc.compte === compteActif);
  const totalPaye = fDuCompte.filter(fc => fc.statut === "Payée").reduce((a, fc) => a + Number(fc.montant), 0);
  const totalAttente = fDuCompte.filter(fc => fc.statut !== "Payée").reduce((a, fc) => a + Number(fc.montant), 0);
  const save = () => {
    const id = "FAC-2026-00" + (factures.length + 1);
    if (modal === "new") setFactures(prev => [...prev, { ...form, id, date: today(), compte: compteActif }]);
    else setFactures(prev => prev.map(fc => fc.id === form.id ? form : fc));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🧾 Comptabilité</h2>
        <Btn onClick={() => { setForm({ client: "", montant: "", statut: "En attente", echeance: "" }); setModal("new"); }}>＋ Nouvelle Facture</Btn>
      </div>
      <div className="compte-switcher">
        {comptes.map(c => (
          <div key={c.id} className={`compte-card ${c.id === compteActif ? "selected" : ""}`}
            onClick={() => setCompteActif(c.id)} style={{ borderColor: c.id === compteActif ? c.couleur : undefined }}>
            <div className="compte-name" style={{ color: c.id === compteActif ? c.couleur : undefined }}>{c.nom}</div>
            <div className="compte-balance" style={{ color: c.couleur }}>{c.solde.toLocaleString()} €</div>
            <div className="compte-bank">{c.banque} · {c.iban}</div>
          </div>
        ))}
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="🏦" label={cActif?.nom} value={cActif?.solde.toLocaleString() + " €"} color={cActif?.couleur} />
        <StatCard icon="✅" label="CA Encaissé" value={totalPaye.toLocaleString() + " €"} color="var(--success)" />
        <StatCard icon="⏳" label="En Attente" value={totalAttente.toLocaleString() + " €"} color="var(--warning)" />
        <StatCard icon="📄" label="Nb Factures" value={fDuCompte.length} color="var(--info)" />
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["N° Facture", "Client", "Montant", "Statut", "Date", "Échéance", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {fDuCompte.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", padding: 30, color: "var(--text-muted)" }}>Aucune facture</td></tr>}
          {fDuCompte.map(fc => (
            <tr key={fc.id}>
              <td style={{ fontWeight: 700, color: "var(--primary)" }}>{fc.id}</td>
              <td className="td-name">{fc.client}</td>
              <td className="td-money">{Number(fc.montant).toLocaleString()} €</td>
              <td><Badge label={fc.statut} /></td>
              <td className="td-tiny">{fc.date}</td>
              <td className="td-tiny">{fc.echeance}</td>
              <td>
                {fc.statut !== "Payée" && <button className="action-btn" onClick={() => setFactures(prev => prev.map(x => x.id === fc.id ? { ...x, statut: "Payée" } : x))} title="Marquer payée">💰</button>}
                <button className="action-btn" onClick={() => { setForm(fc); setModal("edit"); }}>✏️</button>
                <button className="action-btn" onClick={() => setFactures(prev => prev.filter(x => x.id !== fc.id))}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div></Card>
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
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setEffectifs(prev => [...prev, { ...form, id: Date.now() }]);
    else setEffectifs(prev => prev.map(e => e.id === form.id ? form : e));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">👔 Effectifs</h2>
        <Btn onClick={() => { setForm({ nom: "", poste: "", dept: "Commercial", salaire: "", dateEntree: "", contrat: "CDI" }); setModal("new"); }}>＋ Ajouter Employé</Btn>
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Nom", "Poste", "Département", "Salaire", "Contrat", "Date entrée", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{effectifs.map(e => (
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
        ))}</tbody>
      </table></div></Card>
      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Ajouter Employé" : "Modifier Employé"} onClose={() => setModal(null)}>
          <Field label="Nom complet" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Poste" value={form.poste || ""} onChange={f("poste")} />
          <Field label="Département" value={form.dept || ""} onChange={f("dept")} options={["Commercial", "Technique", "Administration", "Direction"]} />
          <Field label="Salaire (€/mois)" value={form.salaire || ""} onChange={f("salaire")} type="number" />
          <Field label="Contrat" value={form.contrat || ""} onChange={f("contrat")} options={["CDI", "CDD", "Stage", "Alternance"]} />
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
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
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
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Poste", "Candidat", "Email", "Statut", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{cands.map(c => (
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
        ))}</tbody>
      </table></div></Card>
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
  const unread = emails.filter(e => !e.lu).length;
  const send = () => {
    setEmails(prev => [{ id: Date.now(), de: "admin@preveris.pro", a: form.a, sujet: form.sujet, date: today(), lu: true }, ...prev]);
    setModal(null);
  };
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
              <button className="action-btn" onClick={ev => { ev.stopPropagation(); setEmails(prev => prev.filter(x => x.id !== e.id)); }}>🗑️</button>
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

// ── SMS / WHATSAPP ─────────────────────────────────────────
function SMSPage() {
  const [messages, setMessages] = useState(MOCK_SMS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ destinataire: "", numero: "", message: "", canal: "SMS" });
  const send = () => {
    setMessages(prev => [{ ...form, id: Date.now(), statut: "Envoyé", date: today() }, ...prev]);
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">💬 SMS / WhatsApp</h2>
        <Btn onClick={() => { setForm({ destinataire: "", numero: "", message: "", canal: "SMS" }); setModal("new"); }}>＋ Nouveau Message</Btn>
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="📱" label="Total Envoyés" value={messages.length} color="var(--primary)" />
        <StatCard icon="✅" label="Livrés" value={messages.filter(m => m.statut === "Livré").length} color="var(--success)" />
        <StatCard icon="💬" label="WhatsApp" value={messages.filter(m => m.canal === "WhatsApp").length} color="var(--success)" />
        <StatCard icon="📨" label="SMS" value={messages.filter(m => m.canal === "SMS").length} color="var(--info)" />
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Destinataire", "Numéro", "Message", "Canal", "Statut", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{messages.map(m => (
          <tr key={m.id}>
            <td className="td-name">{m.destinataire}</td>
            <td className="td-muted">{m.numero}</td>
            <td style={{ maxWidth: 200, fontSize: 13, color: "var(--text-secondary)" }}>{m.message.slice(0, 50)}...</td>
            <td><Badge label={m.canal} /></td>
            <td><Badge label={m.statut} /></td>
            <td className="td-tiny">{m.date}</td>
            <td><button className="action-btn" onClick={() => setMessages(prev => prev.filter(x => x.id !== m.id))}>🗑️</button></td>
          </tr>
        ))}</tbody>
      </table></div></Card>
      {modal === "new" && (
        <Modal title="Nouveau Message" onClose={() => setModal(null)}>
          <Field label="Canal" value={form.canal} onChange={v => setForm(p => ({ ...p, canal: v }))} options={["SMS", "WhatsApp"]} />
          <Field label="Destinataire" value={form.destinataire} onChange={v => setForm(p => ({ ...p, destinataire: v }))} />
          <Field label="Numéro de téléphone" value={form.numero} onChange={v => setForm(p => ({ ...p, numero: v }))} />
          <Field label="Message" value={form.message} onChange={v => setForm(p => ({ ...p, message: v }))} rows={4} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={send}>Envoyer 💬</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── AUTORISATIONS ──────────────────────────────────────────
function AutorisationsPage() {
  const [auths, setAuths] = useState(MOCK_AUTORISATIONS);
  const modules = ["projets", "crm", "comptabilite", "effectifs", "autorisations", "parametres"];
  const moduleLabels = { projets: "📁 Projets", crm: "🎯 CRM", comptabilite: "🧾 Comptabilité", effectifs: "👔 Effectifs", autorisations: "🔐 Autorisations", parametres: "⚙️ Paramètres" };
  const toggle = (role, mod) => setAuths(prev => prev.map(a => a.role === role ? { ...a, [mod]: !a[mod] } : a));
  return (
    <div>
      <h2 className="page-title" style={{ marginBottom: 20 }}>🔐 Autorisations par Rôle</h2>
      <Card>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rôle</th>
                {modules.map(m => <th key={m} style={{ textAlign: "center" }}>{moduleLabels[m]}</th>)}
              </tr>
            </thead>
            <tbody>
              {auths.map(a => (
                <tr key={a.role}>
                  <td><Badge label={a.role} /></td>
                  {modules.map(m => (
                    <td key={m} style={{ textAlign: "center" }}>
                      {a.role === "Administrateur" ? (
                        <span style={{ color: "var(--success)", fontSize: 18 }}>✅</span>
                      ) : (
                        <Toggle checked={a[m]} onChange={() => toggle(a.role, m)} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--primary-light)", borderRadius: 10, fontSize: 13, color: "var(--text-secondary)" }}>
        💡 Les modifications sont appliquées en temps réel. L'Administrateur a accès à tout par défaut.
      </div>
    </div>
  );
}

// ── SUPPORT ────────────────────────────────────────────────
function SupportPage() {
  const [tickets, setTickets] = useState(MOCK_SUPPORT);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setTickets(prev => [...prev, { ...form, id: Date.now(), date: today() }]);
    else setTickets(prev => prev.map(t => t.id === form.id ? form : t));
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🎧 Support</h2>
        <Btn onClick={() => { setForm({ sujet: "", utilisateur: "", priorite: "Normale", statut: "Ouvert" }); setModal("new"); }}>＋ Nouveau Ticket</Btn>
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="📋" label="Total Tickets" value={tickets.length} color="var(--primary)" />
        <StatCard icon="🔴" label="Ouverts" value={tickets.filter(t => t.statut === "Ouvert").length} color="var(--danger)" />
        <StatCard icon="🔵" label="En cours" value={tickets.filter(t => t.statut === "En cours").length} color="var(--info)" />
        <StatCard icon="✅" label="Résolus" value={tickets.filter(t => t.statut === "Résolu").length} color="var(--success)" />
      </div>
      <Card><div className="table-wrap"><table>
        <thead><tr>{["Sujet", "Utilisateur", "Priorité", "Statut", "Date", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{tickets.map(t => (
          <tr key={t.id}>
            <td className="td-name">{t.sujet}</td>
            <td className="td-muted">{t.utilisateur}</td>
            <td><Badge label={t.priorite} /></td>
            <td><Badge label={t.statut} /></td>
            <td className="td-tiny">{t.date}</td>
            <td>
              {t.statut !== "Résolu" && <button className="action-btn" onClick={() => setTickets(prev => prev.map(x => x.id === t.id ? { ...x, statut: "Résolu" } : x))} title="Résoudre">✅</button>}
              <button className="action-btn" onClick={() => { setForm(t); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setTickets(prev => prev.filter(x => x.id !== t.id))}>🗑️</button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>
      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouveau Ticket" : "Modifier Ticket"} onClose={() => setModal(null)}>
          <Field label="Sujet" value={form.sujet || ""} onChange={f("sujet")} />
          <Field label="Utilisateur" value={form.utilisateur || ""} onChange={f("utilisateur")} />
          <Field label="Priorité" value={form.priorite || ""} onChange={f("priorite")} options={["Haute", "Normale", "Basse"]} />
          <Field label="Statut" value={form.statut || ""} onChange={f("statut")} options={["Ouvert", "En cours", "Résolu"]} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── CALENDRIER ─────────────────────────────────────────────
function CalendrierPage() {
  const [events, setEvents] = useState(MOCK_CALENDRIER);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setEvents(prev => [...prev, { ...form, id: Date.now() }]);
    else setEvents(prev => prev.map(e => e.id === form.id ? form : e));
    setModal(null);
  };
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📅 Calendrier</h2>
        <Btn onClick={() => { setForm({ titre: "", date: today(), heure: "09:00", type: "Interne", resp: "" }); setModal("new"); }}>＋ Nouvel Événement</Btn>
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        {["RDV Client", "Interne", "RH", "Formation"].map(t => (
          <Card key={t} className="stat-card">
            <div className="stat-label">{t}</div>
            <div className="stat-value" style={{ color: statColor(t) }}>{events.filter(e => e.type === t).length}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map(e => (
          <Card key={e.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px" }}>
            <div style={{ textAlign: "center", minWidth: 60, background: "var(--primary-light)", borderRadius: 10, padding: "8px 12px" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{e.date.slice(5)}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--primary)" }}>{e.date.slice(8)}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{e.titre}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>🕐 {e.heure} · 👤 {e.resp}</div>
            </div>
            <Badge label={e.type} />
            <div style={{ display: "flex", gap: 4 }}>
              <button className="action-btn" onClick={() => { setForm(e); setModal("edit"); }}>✏️</button>
              <button className="action-btn" onClick={() => setEvents(prev => prev.filter(x => x.id !== e.id))}>🗑️</button>
            </div>
          </Card>
        ))}
      </div>
      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvel Événement" : "Modifier Événement"} onClose={() => setModal(null)}>
          <Field label="Titre" value={form.titre || ""} onChange={f("titre")} />
          <Field label="Date" value={form.date || ""} onChange={f("date")} type="date" />
          <Field label="Heure" value={form.heure || ""} onChange={f("heure")} type="time" />
          <Field label="Type" value={form.type || ""} onChange={f("type")} options={["RDV Client", "Interne", "RH", "Formation"]} />
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

// ── CAMPAGNES DRIP ─────────────────────────────────────────
function CampagnesPage() {
  const [campagnes, setCampagnes] = useState(MOCK_CAMPAGNES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (modal === "new") setCampagnes(prev => [...prev, { ...form, id: Date.now(), envoyes: 0, ouverts: 0, clics: 0 }]);
    setModal(null);
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📧 Campagnes Drip</h2>
        <Btn onClick={() => { setForm({ nom: "", statut: "Brouillon", emails: 1, dateDebut: today() }); setModal("new"); }}>＋ Nouvelle Campagne</Btn>
      </div>
      <div className="stat-cards" style={{ marginBottom: 20 }}>
        <StatCard icon="📧" label="Campagnes Actives" value={campagnes.filter(c => c.statut === "Active").length} color="var(--success)" />
        <StatCard icon="📨" label="Emails Envoyés" value={campagnes.reduce((a, c) => a + c.envoyes, 0)} color="var(--primary)" />
        <StatCard icon="👁️" label="Taux Ouverture" value={Math.round(campagnes.reduce((a, c) => a + c.ouverts, 0) / Math.max(campagnes.reduce((a, c) => a + c.envoyes, 0), 1) * 100) + "%"} color="var(--info)" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {campagnes.map(c => (
          <Card key={c.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{c.nom}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>Début: {c.dateDebut} · {c.emails} email(s)</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge label={c.statut} />
                <button className="action-btn" onClick={() => setCampagnes(prev => prev.filter(x => x.id !== c.id))}>🗑️</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {[
                { label: "Envoyés", val: c.envoyes, color: "var(--info)" },
                { label: "Ouverts", val: c.ouverts, color: "var(--warning)" },
                { label: "Clics", val: c.clics, color: "var(--success)" },
                { label: "Taux ouv.", val: c.envoyes ? Math.round(c.ouverts / c.envoyes * 100) + "%" : "—", color: "var(--purple)" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      {modal === "new" && (
        <Modal title="Nouvelle Campagne" onClose={() => setModal(null)}>
          <Field label="Nom de la campagne" value={form.nom || ""} onChange={f("nom")} />
          <Field label="Nombre d'emails" value={form.emails || ""} onChange={f("emails")} type="number" />
          <Field label="Date de début" value={form.dateDebut || ""} onChange={f("dateDebut")} type="date" />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>Créer</Btn>
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
        <StatCard icon="👥" label="Nouveaux clients" value="18" color="var(--purple)" />
        <StatCard icon="⭐" label="Satisfaction" value="4.8/5" color="var(--warning)" />
      </div>
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle icon="📊">CA Mensuel 2025–2026</SectionTitle>
        <div className="bar-chart">
          {ca.map((v, i) => (
            <div key={i} className="bar-col">
              <span className="bar-val">{(v / 1000).toFixed(0)}k</span>
              <div className="bar" style={{ height: (v / maxCA * 160) + "px", background: i === 11 ? "var(--primary)" : "var(--primary)44" }} />
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
              <span style={{ fontWeight: 800, color: "var(--success)" }}>{Number(p.montant).toLocaleString()} €</span>
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
                <div className="progress-info"><span>{s}</span><span style={{ color: statColor(s), fontWeight: 700 }}>{cnt} ({pct}%)</span></div>
                <div className="progress-track"><div className="progress-fill" style={{ width: pct + "%", background: statColor(s) }} /></div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

// ── PROFIL ─────────────────────────────────────────────────
function ProfilPage({ user, onLogout }) {
  const [profil, setProfil] = useState({ ...MOCK_PROFIL, ...user });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profil);
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const save = () => { setProfil(form); setEditing(false); };
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 className="page-title" style={{ marginBottom: 20 }}>👤 Mon Profil</h2>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, background: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#fff" }}>
            {profil.nom?.[0] || "A"}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{profil.nom}</div>
            <div style={{ color: "var(--text-muted)" }}>{profil.poste}</div>
            <Badge label={profil.role} />
          </div>
        </div>
        {editing ? (
          <>
            <Field label="Nom complet" value={form.nom || ""} onChange={f("nom")} />
            <Field label="Email" value={form.email || ""} onChange={f("email")} type="email" />
            <Field label="Téléphone" value={form.telephone || ""} onChange={f("telephone")} />
            <Field label="Poste" value={form.poste || ""} onChange={f("poste")} />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <Btn outline onClick={() => setEditing(false)}>Annuler</Btn>
              <Btn onClick={save}>Enregistrer</Btn>
            </div>
          </>
        ) : (
          <>
            {[["📧 Email", profil.email], ["📱 Téléphone", profil.telephone], ["💼 Poste", profil.poste], ["📅 Membre depuis", profil.dateInscription]].map(([label, val]) => (
              <div key={label} className="perf-row">
                <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <Btn onClick={() => setEditing(true)}>✏️ Modifier le profil</Btn>
            </div>
          </>
        )}
      </Card>
      <Card>
        <SectionTitle icon="⚙️">Paramètres du compte</SectionTitle>
        <div className="perf-row">
          <span>Changer le mot de passe</span>
          <Btn small outline>🔑 Modifier</Btn>
        </div>
        <div className="perf-row">
          <span>Notifications email</span>
          <Toggle checked={true} onChange={() => {}} />
        </div>
        <div className="perf-row">
          <span>Notifications push</span>
          <Toggle checked={false} onChange={() => {}} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn danger onClick={onLogout}>🚪 Se déconnecter</Btn>
        </div>
      </Card>
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
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadNotifs = notifs.filter(n => !n.lu).length;

  const handleLogin = (u) => { setUser(u); setPage("dashboard"); };
  const handleLogout = () => { setUser(null); setPage("dashboard"); };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <Dashboard setPage={setPage} />;
      case "projets":      return <ProjetsPage />;
      case "utilisateurs": return <UtilisateursPage />;
      case "crm":          return <CRMPage />;
      case "opportunites": return <OpportunitesPage />;
      case "suivi":        return <SuiviPage />;
      case "taches":       return <TachesPage />;
      case "comptabilite": return <ComptabilitePage />;
      case "effectifs":    return <EffectifsPage />;
      case "candidatures": return <CandidaturesPage />;
      case "emails":       return <EmailsPage />;
      case "sms":          return <SMSPage />;
      case "autorisations":return <AutorisationsPage />;
      case "support":      return <SupportPage />;
      case "calendrier":   return <CalendrierPage />;
      case "campagnes":    return <CampagnesPage />;
      case "analytics":    return <AnalyticsPage />;
      case "parametres":   return <ProfilPage user={user} onLogout={handleLogout} />;
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
    <div className={dark ? "dark" : ""} onClick={() => setShowNotifs(false)}>
      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="topbar-logo">
          <div className="logo-icon">P</div>
          <div>
            <div className="logo-text">Prev'Hub</div>
            <div className="logo-sub">PREVERIS</div>
          </div>
          <span className="admin-badge">{user.role}</span>
        </div>

        <SearchBar setPage={setPage} />

        <div className="topbar-actions">
          <button className="icon-btn" onClick={() => setDark(d => !d)} title="Dark mode">
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="icon-btn" title="Notifications"
            onClick={e => { e.stopPropagation(); setShowNotifs(s => !s); }}>
            🔔
            {unreadNotifs > 0 && <span className="notif-dot">{unreadNotifs}</span>}
          </button>
          <div className="user-menu" onClick={() => setPage("parametres")}>
            <div className="avatar">{user.nom?.[0] || "A"}</div>
            <span className="user-name">{user.nom?.split(" ")[0]}</span>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>▾</span>
          </div>
        </div>

        {showNotifs && (
          <NotifPanel notifs={notifs} setNotifs={setNotifs} onClose={() => setShowNotifs(false)} />
        )}
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
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}
