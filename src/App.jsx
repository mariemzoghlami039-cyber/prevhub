import { useState, useEffect } from "react";
import ProjetDetail from "./ProjetDetail";
import IAAssistant from "./IAAssistant";
import "./App.css";

// ══════════════════════════════════════════════════════════════
//  PERSISTENT STORAGE HOOK
//  Sauvegarde automatique dans localStorage
// ══════════════════════════════════════════════════════════════

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem("prevhub_" + key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
  });

  useEffect(() => {
    try { localStorage.setItem("prevhub_" + key, JSON.stringify(value)); }
    catch {}
  }, [key, value]);

  return [value, setValue];
}

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

// Entreprises par établissement (shared across pages)
const ENTREPRISES_PAR_ETAB = {
  1: [
    { id:111, nom:"SAS Begreen A1",       contact:"Jean Dupont",    email:"j.dupont@begreen.fr",    tel:"06 12 34 56 78", statut:"Client" },
    { id:112, nom:"SARL Verts Toits",     contact:"Marie Martin",   email:"m.martin@vertstoits.fr", tel:"06 98 76 54 32", statut:"Client" },
  ],
  2: [
    { id:121, nom:"POLY91 Industries",    contact:"Pierre Blanc",   email:"p.blanc@poly91.fr",      tel:"06 11 22 33 44", statut:"Client" },
    { id:122, nom:"POLY91 Commerce",      contact:"Sophie Renard",  email:"s.renard@poly91.fr",     tel:"06 55 66 77 88", statut:"Prospect" },
  ],
  3: [
    { id:131, nom:"SAS IKAI Nord",        contact:"Luc Bernard",    email:"l.bernard@ikai.fr",      tel:"06 44 55 66 77", statut:"Client" },
  ],
  4: [
    { id:141, nom:"France Asso Paris",    contact:"Nadia Kowalski", email:"n.kow@ftda.fr",          tel:"06 33 44 55 66", statut:"Client" },
    { id:142, nom:"France Asso Lyon",     contact:"Omar Saidani",   email:"o.said@ftda.fr",         tel:"06 77 88 99 00", statut:"Prospect" },
  ],
};

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
  nom: "Marie Zoghlami",
  email: "admin@preveris.pro",
  role: "Administrateur",
  telephone: "+33 6 12 34 56 78",
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
  const [email, setEmail]       = useState("admin@preveris.pro");
  const [password, setPassword] = useState("admin123");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@preveris.pro" && password === "admin123") {
        onLogin({ nom: "Marie Zoghlami", email, role: "Administrateur", avatar: "M" });
      } else {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login2-page">
      {/* ── Côté gauche — Formulaire ── */}
      <div className="login2-left">
        {/* Logo */}
        <div className="login2-logo">
          <div className="login2-logo-icon">P</div>
          <span className="login2-logo-text">Prev<span style={{color:"var(--primary)"}}>&#39;</span>Hub</span>
        </div>

        <div className="login2-form-wrap">
          {/* Icone cadenas */}
          <div className="login2-lock">🔒</div>
          <h2 className="login2-title">Connexion</h2>
          <p className="login2-sub">Connectez-vous à votre compte Prev'Hub</p>

          {error && <div className="login-error">⚠️ {error}</div>}

          {/* Champ email */}
          <div className="login2-field">
            <label className="login2-label">Nom d'utilisateur</label>
            <div className="login2-input-wrap">
              <span className="login2-icon">👤</span>
              <input
                className="login2-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="admin@preveris.pro"
              />
            </div>
          </div>

          {/* Champ mot de passe */}
          <div className="login2-field">
            <label className="login2-label">Mot de passe</label>
            <div className="login2-input-wrap">
              <span className="login2-icon">🔑</span>
              <input
                className="login2-input"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="••••••••••••"
              />
              <button className="login2-eye" onClick={() => setShowPwd(s => !s)}>
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button className="login2-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "⏳ Connexion en cours..." : "Se connecter →"}
          </button>

          <div className="login2-hint">
            💡 Demo: admin@preveris.pro / admin123
          </div>
        </div>
      </div>

      {/* ── Côté droit — Marketing ── */}
      <div className="login2-right">
        {/* Shapes décoratives */}
        <div className="login2-shape login2-shape-1" />
        <div className="login2-shape login2-shape-2" />
        <div className="login2-shape login2-shape-3" />
        <div className="login2-shape login2-shape-4" />

        {/* Badges */}
        <div className="login2-badges">
          <span className="login2-badge">⚡ Accès Sécurisé</span>
          <span className="login2-badge">🚀 Innovation 2026</span>
        </div>

        {/* Texte principal */}
        <div className="login2-hero">
          <h1 className="login2-hero-title">
            Transformez<br />
            <span style={{ color: "#fff", fontWeight: 900 }}>votre Prévoyance</span><br />
            <span style={{ color: "#fff", fontWeight: 900 }}>Collective</span>
          </h1>
          <p className="login2-hero-sub">
            La plateforme tout-en-un des professionnels de la prévoyance d'entreprise
          </p>
        </div>

        {/* Features */}
        <div className="login2-features">
          {[
            { icon: "🤖", title: "IA Assistant", desc: "Assistant conversationnel qui analyse vos dossiers en langage simple" },
            { icon: "🛡️", title: "Sécurité RGPD", desc: "Conformité totale avec audit trail complet et données protégées" },
            { icon: "📊", title: "Analytics Temps Réel", desc: "Tableaux de bord et rapports générés automatiquement" },
          ].map(f => (
            <div key={f.title} className="login2-feature">
              <div className="login2-feature-icon">{f.icon}</div>
              <div>
                <div className="login2-feature-title">{f.title}</div>
                <div className="login2-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
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
function ProjetsPage({ projets: propProjets, setProjets: propSetProjets, factures: propFactures, setFactures: propSetFactures, onDeleteProjet }) {
  // Shared state depuis App() — source unique de vérité
  const [_localProjets, _setLocalProjets] = useLocalStorage("projets", MOCK_PROJETS);
  const projets    = (propProjets    !== undefined && propProjets    !== null) ? propProjets    : _localProjets;
  const setProjets = (propSetProjets !== undefined && propSetProjets !== null) ? propSetProjets : _setLocalProjets;
  const [selected, setSelected]     = useState(null);
  const [modalNew, setModalNew]     = useState(false);
  const [form, setForm]             = useState({});
  const [search, setSearch]         = useState("");
  const [filterStatut, setFilter]   = useState("Tous");
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const STATUTS_FILTER = ["Tous", "En brouillon", "En attente de signature client", "Dossier envoyé", "Réalisation projet", "Terminé"];

  const filtered = projets.filter(p => {
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search);
    const matchStatut = filterStatut === "Tous" || p.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  const createProjet = () => {
    if (!form.client) return;
    const newP = { ...form, id: projets.length + 900 + 1, date: today(), statut: form.statut || "En brouillon", montant: Number(form.montant) || 0 };
    setProjets(prev => [newP, ...prev]);
    setModalNew(false);
    setForm({});
  };

  const saveProjet = (updated) => {
    setProjets(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const STATUT_COLORS_MAP = {
    "En brouillon": "#6b7280",
    "En attente de signature client": "#f59e0b",
    "En attente de retour du client": "#f59e0b",
    "Dossier envoyé": "#3b82f6",
    "Réalisation pièces graphiques": "#8b5cf6",
    "Réalisation projet": "#8b5cf6",
    "Devis accepté": "#10b981",
    "En cours": "#3b82f6",
    "Terminé": "#059669",
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h2 className="page-title">📁 Projets <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>({filtered.length})</span></h2>
        <Btn onClick={() => { setForm({ client: "", ville: "", statut: "En brouillon", montant: "", resp: "" }); setModalNew(true); }}>＋ Nouveau Projet</Btn>
      </div>

      {/* Filtres */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          style={{ padding: "7px 14px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--bg)", fontSize: 13, outline: "none", minWidth: 200 }}
          placeholder="🔍 Num projet ou nom enseigne..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{ padding: "7px 14px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--bg)", fontSize: 13, outline: "none" }}
          value={filterStatut} onChange={e => setFilter(e.target.value)}>
          {STATUTS_FILTER.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table — style backoffice.preveris.pro */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                {["N° de projet ↕", "NOM ENSEIGNE ↕", "VILLE ↕", "ÉTAT PROJET ↕", "RÉALISATEUR(S) ↕", "DEADLINE CLIENT ↕", "DERNIÈRE ACTUALISATION ↕", "SYNTHÈSE", "ACTIONS"].map(h => (
                  <th key={h} style={{ fontSize: 11, letterSpacing: "0.5px", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const sc = STATUT_COLORS_MAP[p.statut] || "#6b7280";
                const isLate = p.deadlineClient && new Date(p.deadlineClient) < new Date();
                return (
                  <tr key={p.id} style={{ cursor: "pointer" }}
                    onClick={() => setSelected(p)}
                    title="Cliquer pour ouvrir les détails du projet">
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontSize: 15 }}>
                      {p.id}
                      {p.origine === "pipeline" && <span style={{ marginLeft:6, background:"rgba(16,185,129,0.12)", color:"#059669", borderRadius:4, padding:"1px 5px", fontSize:10, fontWeight:700 }}>🔗 Pipeline</span>}
                    </td>
                    <td style={{ fontWeight: 700 }}>{p.client}</td>
                    <td className="td-muted">{p.ville || p.adresse || "—"}</td>
                    <td>
                      <span style={{ background: sc + "22", color: sc, border: `1px solid ${sc}44`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {p.statut}
                      </span>
                    </td>
                    <td style={{ color: p.resp ? "var(--text-primary)" : "var(--text-muted)", fontStyle: p.resp ? "normal" : "italic" }}>
                      {p.resp || "Non assigné"}
                    </td>
                    <td style={{ color: isLate ? "var(--danger)" : "var(--text-primary)", fontWeight: isLate ? 700 : 400, fontSize: 13 }}>
                      {p.deadlineClient || "—"}
                    </td>
                    <td className="td-muted" style={{ fontSize: 13 }}>{p.date}</td>
                    <td>
                      {p.synthese ? (
                        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{p.synthese.slice(0, 40)}...</span>
                      ) : (
                        <span style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600 }}>
                          ✏️ Ajouter une synthèse
                        </span>
                      )}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="action-btn" onClick={() => setSelected(p)} title="Ouvrir">📂</button>
                      <button className="action-btn" onClick={() => () => {
                          if (!window.confirm("Supprimer ce projet et toutes ses données liées ?")) return;
                          if (onDeleteProjet) {
                            onDeleteProjet(p);
                          } else {
                            setProjets(prev => prev.filter(x => x.id !== p.id));
                          }
                        }} title="Supprimer">🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal ProjetDetail */}
      {selected && (
        <ProjetDetail
          projet={selected}
          onClose={() => setSelected(null)}
          onSave={(updated) => { saveProjet(updated); setSelected(updated); }}
        />
      )}

      {/* Modal Nouveau Projet */}
      {modalNew && (
        <Modal title="Nouveau Projet" onClose={() => setModalNew(false)}>
          <Field label="Nom Enseigne (Client)" value={form.client || ""} onChange={f("client")} />
          <Field label="Ville" value={form.ville || ""} onChange={f("ville")} />
          <Field label="Adresse" value={form.adresse || ""} onChange={f("adresse")} />
          <Field label="État initial" value={form.statut || ""} onChange={f("statut")} options={["En brouillon", "En attente de signature client", "Dossier envoyé", "Réalisation projet"]} />
          <Field label="Montant estimé (€)" value={form.montant || ""} onChange={f("montant")} type="number" />
          <Field label="Réalisateur" value={form.resp || ""} onChange={f("resp")} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModalNew(false)}>Annuler</Btn>
            <Btn onClick={createProjet}>Créer le Projet</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── UTILISATEURS ───────────────────────────────────────────
function UtilisateursPage() {
  const [users, setUsers] = useLocalStorage("users", MOCK_USERS);
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

// ── CRM — MULTI-ONGLETS ──────────────────────────────────
function CRMPage({ leads, setLeads, projets, setProjets, factures, setFactures, onLeadGagne }) {
  const [tab, setTab] = useState("pipeline");

  return (
    <div>
      {/* Sub-tabs */}
      <div style={{ display:"flex", gap:4, marginBottom:20, borderBottom:"1.5px solid var(--border)", paddingBottom:0 }}>
        {[
          { id:"pipeline",  label:"📊 Pipeline" },
          { id:"clients",   label:"🏢 Gestion Clients" },
          { id:"prospects", label:"🎯 Gestion Prospects" },
          { id:"tableau",   label:"📈 Tableau de Bord" },
          { id:"compta",    label:"💰 Comptabilité", isNew: true },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:"8px 16px", border:"none", background:"transparent", cursor:"pointer",
            fontSize:13, fontWeight: tab===t.id ? 700 : 500,
            color: tab===t.id ? "var(--primary)" : "var(--text-muted)",
            borderBottom: tab===t.id ? "2.5px solid var(--primary)" : "2.5px solid transparent",
            display:"flex", alignItems:"center", gap:6,
          }}>
            {t.label}
            {t.isNew && <span style={{background:"var(--primary)",color:"#fff",borderRadius:4,padding:"1px 5px",fontSize:10,fontWeight:700}}>NEW</span>}
          </button>
        ))}
      </div>

      {tab === "pipeline"  && <CRMPipelineTab leads={leads} setLeads={setLeads} onLeadGagne={onLeadGagne} />}
      {tab === "clients"   && <CRMClientsTab />}
      {tab === "prospects" && <CRMProspectsTab />}
      {tab === "tableau"   && <CRMTableauTab leads={leads} />}
      {tab === "compta"    && <CRMComptaTab factures={factures} setFactures={setFactures} projets={projets} />}
    </div>
  );
}

// ── TAB 1: PIPELINE KANBAN ─────────────────────────────────
function CRMPipelineTab({ leads: propLeads, setLeads: propSetLeads, onLeadGagne }) {
  const MOCK_LEADS_EXTENDED = [
    { id: 1, nom: "Mutuelle des Architectes", contact: "Peggy CHASSIER", email: "peggy.chassier@maf.fr", tel: "0772360325", source: "Site web", statut: "Nouveau Lead", valeur: 0, score: 10, date: "2026-03-01" },
    { id: 2, nom: "Institut Saint-Dominique", contact: "Jean-Paul AUBRY", email: "jean-paul746@orange.fr", tel: "0681860066", source: "Référence", statut: "Nouveau Lead", valeur: 0, score: 5, date: "2026-02-28" },
    { id: 3, nom: "Restaurant JAP", contact: "Kamel LAZAAR", email: "lazaar.hic@gmail.com", tel: "0677997908", source: "LinkedIn", statut: "Nouveau Lead", valeur: 0, score: 5, date: "2026-02-25" },
    { id: 4, nom: "Reveyron", contact: "Maxime MOREAU", email: "mmoreau@keops.com", tel: "0788280264", source: "Référence", statut: "Qualifié", valeur: 0, score: 10, date: "2026-02-20" },
    { id: 5, nom: "Domaine de la Tremblay", contact: "Maéva KAVEGE", email: "maevakavege@gmail.com", tel: "0685869054", source: "Site web", statut: "Qualifié", valeur: 0, score: 15, date: "2026-02-18" },
    { id: 7, nom: "Les Polissons", contact: "Marius Brun", email: "marius.brun@atelier.archi", tel: "0615930909", source: "LinkedIn", statut: "Qualifié", valeur: 0, score: 10, date: "2026-02-10" },
    { id: 8, nom: "DPS Market Saint-Thibault", contact: "Nabil MAKSENE", email: "sas.maksene@gmail.com", tel: "0669380808", source: "Site web", statut: "Devis Envoyé", valeur: 0, score: 20, date: "2026-02-08" },
    { id: 9, nom: "DIAMOND PALACE", contact: "Ivana VRATONJIC", email: "iv.archidesign@gmail.com", tel: "0699017674", source: "Référence", statut: "Devis Envoyé", valeur: 0, score: 15, date: "2026-02-05" },
    { id: 10, nom: "Mutuelle des Architectes", contact: "Peggy CHASSIER", email: "peggy.chassier@maf.fr", tel: "0772360325", source: "Site web", statut: "Négociation", valeur: 0, score: 25, date: "2026-01-30" },
    { id: 11, nom: "Centre National de la Danse", contact: "Erell BIHAN", email: "erell.bihan@cnd.fr", tel: "0665776939", source: "Référence", statut: "Négociation", valeur: 0, score: 25, date: "2026-01-28" },
    { id: 12, nom: "APEC", contact: "Raphaël DE OLIVEIRA", email: "raphael.de-oliveira@apec.fr", tel: "0658844319", source: "Référence", statut: "Gagné", valeur: 0, score: 13, date: "2026-01-15" },
    { id: 13, nom: "Maison Saint Michel", contact: "Allegre Pierrick", email: "pierrick.allegre@gmail.com", tel: "0621192797", source: "LinkedIn", statut: "Gagné", valeur: 0, score: 18, date: "2026-01-10" },
  ];

  const COLONNES = [
    { id: "Nouveau Lead", label: "Nouveau Lead", color: "#94a3b8" },
    { id: "Qualifié",     label: "Qualifié",     color: "#10b981" },
    { id: "Devis Envoyé", label: "Devis Envoyé", color: "#f59e0b" },
    { id: "Négociation",  label: "Négociation",  color: "#8b5cf6" },
    { id: "Gagné",        label: "Gagné ✓",      color: "#059669" },
  ];

  const [_leads, _setLeads] = useLocalStorage("crm_leads", MOCK_LEADS_EXTENDED);
  const leads    = propLeads    && propLeads.length    > 0 ? propLeads    : _leads;
  const setLeads = propSetLeads ? (v) => { propSetLeads(v); _setLeads(v); } : _setLeads;
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({});
  const [search, setSearch] = useState("");
  const [dragId, setDragId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadTab, setLeadTab] = useState("info");
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (modal === "new") setLeads(prev => [...prev, { ...form, id: Date.now(), date: today(), score: 5 }]);
    else setLeads(prev => prev.map(l => l.id === form.id ? form : l));
    setModal(null);
  };

  const moveCard = (id, newStatut) => setLeads(prev => prev.map(l => l.id === id ? { ...l, statut: newStatut } : l));
  const filtered = leads.filter(l => !search || l.nom.toLowerCase().includes(search.toLowerCase()) || l.contact.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">📊 Pipeline de Vente</h2>
          <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>
            {leads.length} opportunités · 780 au total · Valeur: {leads.reduce((a,l)=>a+Number(l.valeur||0),0).toLocaleString()} €
          </div>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <input style={{ padding:"7px 14px", borderRadius:20, border:"1.5px solid var(--border)", background:"var(--bg)", fontSize:13, outline:"none", width:220 }}
            placeholder="🔍 Rechercher un lead..." value={search} onChange={e => setSearch(e.target.value)} />
          <Btn onClick={() => { setForm({ nom:"", contact:"", email:"", tel:"", source:"Site web", statut:"Nouveau Lead", valeur:0 }); setModal("new"); }}>＋ Nouveau Lead</Btn>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[
          { label:"Entreprises actives", val:"1 529", color:"#3b82f6" },
          { label:"Nouveaux prospects",  val:"280",   color:"#10b981" },
          { label:"Prospects qualifiés", val:"35",    color:"#f59e0b" },
          { label:"Taux de conversion",  val:"2%",    color:"#8b5cf6" },
        ].map(k => (
          <div key={k.label} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 18px", borderTop:`3px solid ${k.color}` }}>
            <div style={{ fontSize:26, fontWeight:800, color:k.color }}>{k.val}</div>
            <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="kanban-board">
        {COLONNES.map(col => {
          const colLeads = filtered.filter(l => l.statut === col.id);
          return (
            <div key={col.id} className="kanban-col"
              onDragOver={e => e.preventDefault()}
              onDrop={() => dragId && moveCard(dragId, col.id)}>
              <div className="kanban-col-header">
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:col.color }} />
                  <span style={{ fontWeight:700, fontSize:14 }}>{col.label}</span>
                  <span className="kanban-count" style={{ background:col.color+"22", color:col.color }}>{colLeads.length}</span>
                </div>
                <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{colLeads.reduce((a,l)=>a+Number(l.valeur||0),0).toLocaleString()} €</div>
              </div>
              <div style={{ padding:"0 8px 8px" }}>
                <input style={{ width:"100%", padding:"5px 10px", borderRadius:8, border:"1px solid var(--border)", fontSize:12, background:"var(--bg)", outline:"none" }}
                  placeholder="Rechercher par nom..." />
              </div>
              <div className="kanban-cards">
                {colLeads.map(lead => (
                  <div key={lead.id} className="kanban-card" draggable
                    onDragStart={() => setDragId(lead.id)} onDragEnd={() => setDragId(null)}
                    onClick={(e) => { if(!e.target.closest(".action-btn")) { setSelectedLead(lead); setLeadTab("info"); }}}>
                    <div className="kanban-card-header">
                      <span style={{ fontWeight:700, fontSize:13, flex:1 }}>{lead.nom}</span>
                      <span style={{ fontSize:11, color:col.color, fontWeight:700, background:col.color+"22", padding:"1px 6px", borderRadius:10 }}>↗ {lead.score}</span>
                    </div>
                    <div style={{ fontSize:12, color:"var(--text-secondary)", margin:"4px 0" }}>{lead.contact}</div>
                    {lead.email && <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:4 }}>✉️ {lead.email}</div>}
                    {lead.tel   && <div style={{ fontSize:11, color:"var(--text-muted)" }}>📞 {lead.tel}</div>}
                    <div className="kanban-card-actions">
                      <button className="action-btn" onClick={() => { setForm(lead); setModal("edit"); }}>✏️</button>
                      <button className="action-btn" onClick={() => setLeads(prev => prev.filter(x => x.id !== lead.id))}>🗑️</button>
                      {col.id !== "Gagné" && (
                        <button className="action-btn" onClick={() => {
                          const idx = COLONNES.findIndex(c => c.id === col.id);
                          if (idx < COLONNES.length-1) {
                            const nextStatut = COLONNES[idx+1].id;
                            moveCard(lead.id, nextStatut);
                            if (nextStatut === "Gagné" && onLeadGagne) onLeadGagne({...lead, statut:"Gagné"});
                          }
                        }}>→</button>
                      )}
                    </div>
                  </div>
                ))}
                <button className="kanban-add-btn"
                  onClick={() => { setForm({ nom:"", contact:"", email:"", tel:"", source:"Site web", statut:col.id, valeur:0 }); setModal("new"); }}>
                  ＋ Ajouter
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal==="new" ? "Nouveau Lead" : "Modifier Lead"} onClose={() => setModal(null)}>
          <Field label="Nom de l'entreprise" value={form.nom||""} onChange={f("nom")} />
          <Field label="Contact" value={form.contact||""} onChange={f("contact")} />
          <Field label="Email" value={form.email||""} onChange={f("email")} type="email" />
          <Field label="Téléphone" value={form.tel||""} onChange={f("tel")} />
          <Field label="Valeur estimée (€)" value={form.valeur||""} onChange={f("valeur")} type="number" />
          <Field label="Source" value={form.source||""} onChange={f("source")} options={["Site web","Référence","LinkedIn","Téléphone","Salon"]} />
          <Field label="Étape" value={form.statut||""} onChange={f("statut")} options={COLONNES.map(c=>c.id)} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={save}>{modal==="new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}

      {/* ── MODAL DÉTAIL LEAD FULLSCREEN ── */}
      {selectedLead && (
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"var(--bg)", zIndex:9999, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Header orange full width */}
          <div style={{ background:"var(--primary)", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", minHeight:56, flexShrink:0 }}>
            <div style={{ fontWeight:700, fontSize:17, color:"#fff", letterSpacing:0.3 }}>
              OPP-{selectedLead.id.toString().padStart(6,"0")} — {selectedLead.nom}
            </div>
            <button onClick={() => setSelectedLead(null)} style={{ background:"rgba(255,255,255,0.25)", border:"none", color:"#fff", width:32, height:32, borderRadius:6, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
          </div>

          {/* Tabs bar */}
          <div style={{ background:"var(--card)", borderBottom:"1px solid var(--border)", display:"flex", gap:0, padding:"0 32px", flexShrink:0, overflowX:"auto" }}>
            {[
              { id:"info",     label:"Informations" },
              { id:"assign",   label:"Assignation" },
              { id:"fichiers", label:"Chat et Fichiers" },
              { id:"mails",    label:"Mails" },
              { id:"avancement",label:"Avancement" },
              { id:"echanges", label:"Échanges" },
              { id:"taches",   label:"Tâches" },
              { id:"compta",   label:"Comptabilité" },
            ].map(t => (
              <button key={t.id} onClick={() => setLeadTab(t.id)} style={{
                padding:"16px 20px", border:"none", background:"transparent", cursor:"pointer",
                fontSize:13, fontWeight: leadTab===t.id ? 700 : 400,
                color: leadTab===t.id ? "var(--primary)" : "var(--text-secondary)",
                borderBottom: leadTab===t.id ? "3px solid var(--primary)" : "3px solid transparent",
                whiteSpace:"nowrap", transition:"all 0.15s",
              }}>{t.label}</button>
            ))}
          </div>

          {/* Save button bar */}
          <div style={{ background:"var(--card)", borderBottom:"1px solid var(--border)", padding:"10px 32px", display:"flex", gap:10, flexShrink:0 }}>
            <Btn onClick={() => { setLeads(prev => prev.map(l => l.id===selectedLead.id ? {...l,...selectedLead} : l)); }}>💾 Enregistrer les modifications</Btn>
            <div style={{ flex:1 }} />
            <Btn outline onClick={() => { setSelectedLead(null); setForm(selectedLead); setModal("edit"); }}>✏️ Modifier</Btn>
            <Btn style={{ background:"#3b82f6" }} onClick={() => {
              const updated = {...selectedLead, statut:"Gagné"};
              setLeads(prev => prev.map(l => l.id===selectedLead.id ? updated : l));
              if (onLeadGagne) onLeadGagne(updated);
              setSelectedLead(null);
            }}>🏆 Convertir en client</Btn>
            <Btn style={{ background:"#ef4444" }} onClick={() => { setLeads(prev => prev.filter(l => l.id!==selectedLead.id)); setSelectedLead(null); }}>🗑️ Supprimer</Btn>
          </div>

          {/* Content area scrollable */}
          <div style={{ flex:1, overflowY:"auto", padding:"32px" }}>

            {leadTab === "info" && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, maxWidth:1100 }}>
                {/* Left: Prestations */}
                <div>
                  <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Prestations et description</div>

                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>Prestations siège</div>
                    <div style={{ border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", background:"var(--card)", fontSize:13, color:"var(--text-muted)", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                      Ajouter une prestation <span style={{ fontSize:16 }}>›</span>
                    </div>
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>Prestations indépendant</div>
                    <div style={{ border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", background:"var(--card)", fontSize:13, color:"var(--text-muted)", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                      Ajouter une prestation <span style={{ fontSize:16 }}>›</span>
                    </div>
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <button style={{ background:"none", border:"none", color:"var(--primary)", cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:18 }}>＋</span> Ajouter une prestation personnalisée
                    </button>
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>Descriptif court</div>
                    <textarea style={{ width:"100%", border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", background:"var(--card)", fontSize:13, color:"var(--text)", resize:"vertical", minHeight:80, outline:"none" }}
                      placeholder="Saisissez un descriptif court du projet..." />
                  </div>
                </div>

                {/* Right: Deadlines */}
                <div>
                  <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Deadlines et descriptif complet</div>

                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>Deadline client</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", background:"var(--card)" }}>
                      <input type="date" style={{ flex:1, border:"none", background:"transparent", fontSize:13, color:"var(--text)", outline:"none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>Deadline indépendant</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", background:"var(--card)" }}>
                      <input type="date" style={{ flex:1, border:"none", background:"transparent", fontSize:13, color:"var(--text)", outline:"none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>Descriptif complet</div>
                    <textarea style={{ width:"100%", border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", background:"var(--card)", fontSize:13, color:"var(--text)", resize:"vertical", minHeight:120, outline:"none" }}
                      placeholder="Saisissez une description complète du projet..." />
                  </div>

                  {/* Info prospect */}
                  <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:10, padding:16, marginTop:8 }}>
                    <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>Informations prospect</div>
                    {[
                      { label:"Entreprise", val:selectedLead.nom },
                      { label:"Contact",    val:selectedLead.contact },
                      { label:"Email",      val:selectedLead.email || "—" },
                      { label:"Téléphone",  val:selectedLead.tel || "—" },
                      { label:"Statut",     val:selectedLead.statut },
                      { label:"Score",      val:"↗ "+selectedLead.score },
                    ].map(r => (
                      <div key={r.label} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid var(--border)", fontSize:13 }}>
                        <span style={{ color:"var(--text-muted)" }}>{r.label}</span>
                        <span style={{ fontWeight:500 }}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {leadTab === "assign" && (
              <div style={{ maxWidth:700 }}>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Assignation</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {[
                    { label:"Commercial assigné", val:"hamdi ayari" },
                    { label:"Territoire",          val:"Île-de-France" },
                    { label:"Équipe",              val:"Équipe A" },
                    { label:"Priorité",            val:"Normale" },
                  ].map(r => (
                    <div key={r.label} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:10, padding:16 }}>
                      <div style={{ fontSize:12, color:"var(--text-muted)", marginBottom:6 }}>{r.label}</div>
                      <div style={{ fontWeight:600 }}>{r.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(leadTab === "fichiers" || leadTab === "mails" || leadTab === "avancement" || leadTab === "echanges") && (
              <div style={{ maxWidth:700 }}>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>
                  { ({ fichiers:"Chat et Fichiers", mails:"Mails", avancement:"Avancement", echanges:"Échanges" })[leadTab] }
                </div>
                <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:40, textAlign:"center", color:"var(--text-muted)", fontSize:14 }}>
                  Aucun élément pour ce prospect
                </div>
                <div style={{ marginTop:12 }}><Btn>＋ Ajouter</Btn></div>
              </div>
            )}

            {leadTab === "taches" && (
              <div style={{ maxWidth:700 }}>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Tâches liées</div>
                <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:40, textAlign:"center", color:"var(--text-muted)", fontSize:14 }}>
                  Aucune tâche assignée
                </div>
                <div style={{ marginTop:12 }}><Btn>＋ Créer une tâche</Btn></div>
              </div>
            )}

            {leadTab === "compta" && (
              <div style={{ maxWidth:900 }}>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Comptabilité — {selectedLead.nom}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:20 }}>
                  {[
                    { label:"CA Total",        val:"0 €",  color:"#10b981" },
                    { label:"Factures émises",  val:"0",    color:"var(--primary)" },
                    { label:"Impayés",          val:"0 €",  color:"#ef4444" },
                  ].map(k => (
                    <div key={k.label} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"16px 20px", borderTop:`3px solid ${k.color}` }}>
                      <div style={{ fontSize:24, fontWeight:800, color:k.color }}>{k.val}</div>
                      <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{k.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:40, textAlign:"center", color:"var(--text-muted)", fontSize:14 }}>
                  Aucune facture pour ce prospect
                </div>
                <div style={{ marginTop:12 }}><Btn>＋ Créer une facture</Btn></div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ── TAB 2: GESTION CLIENTS (Hiérarchie) ───────────────────
function CRMClientsTab() {
  const DATA = {
    groupements: [
      { id:1, nom:"Begreen Bât 1",         adresse:"rue de l'avenir, 10410 ST PARRES AUX TERTRES", ville:"Saint-Parres-aux-Tertres", cp:"10410", cat:3, lastComm:"05/12/2023", period:5, nextComm:"01/05/2028", freqVisites:2, avis:"Favorable",  statut:"Actif" },
      { id:2, nom:"Cap Saran",              adresse:"12 rue du Commerce",                           ville:"Saran",                    cp:"45770", cat:2, lastComm:"12/06/2022", period:3, nextComm:"01/12/2025", freqVisites:1, avis:"Favorable",  statut:"Actif" },
      { id:3, nom:"Clos du Chêne Bât 4",   adresse:"Rue des Chêvrefeuilles Parc commercial Be Green, 10410 Saint-Parres-aux-Tertres", ville:"Chanteloup-en-Brie", cp:"10410", cat:3, lastComm:"02/03/2025", period:5, nextComm:"01/02/2030", freqVisites:2, avis:"Favorable",  statut:"Actif" },
      { id:4, nom:"E. Leclerc - Montgeron", adresse:"Avenue de la République",                     ville:"Montgeron",                cp:"91230", cat:1, lastComm:"05/01/2022", period:3, nextComm:"30/04/2028", freqVisites:3, avis:"Favorable",  statut:"Actif" },
      { id:5, nom:"Begreen Terville",       adresse:"Zone industrielle",                            ville:"Terville",                 cp:"57100", cat:null, lastComm:"—", period:null, nextComm:"—", freqVisites:null, avis:"Non défini", statut:"Actif" },
      { id:6, nom:"Action/Maboul-Jonzac",   adresse:"route de Mirambeau",                          ville:"Jonzac",                   cp:"17500", cat:1, lastComm:"—", period:null, nextComm:"—", freqVisites:null, avis:"Non défini", statut:"Actif" },
    ],
    etablissements: {
      1: [
        { id:11, nom:"Begreen Bât 1 — Site A", adresse:"rue de l'avenir", ville:"Saint-Parres", cp:"10410", cat:3, lastComm:"05/12/2023", avis:"Favorable", statut:"Actif", nbEntreprises:3, nbContacts:4 },
        { id:12, nom:"Begreen Bât 1 — Site B", adresse:"rue de l'avenir", ville:"Saint-Parres", cp:"10410", cat:3, lastComm:"01/06/2022", avis:"Favorable", statut:"Actif", nbEntreprises:1, nbContacts:1 },
      ],
      2: [{ id:21, nom:"Cap Saran — Principal", adresse:"12 rue du Commerce", ville:"Saran", cp:"45770", cat:2, lastComm:"12/06/2022", avis:"Favorable", statut:"Actif", nbEntreprises:2, nbContacts:3 }],
      3: [
        { id:31, nom:"Clos du Chêne — Bât 4A", adresse:"Parc Be Green", ville:"Chanteloup-en-Brie", cp:"10410", cat:3, lastComm:"02/03/2025", avis:"Favorable", statut:"Actif", nbEntreprises:2, nbContacts:2 },
        { id:32, nom:"Clos du Chêne — Bât 4B", adresse:"Parc Be Green", ville:"Chanteloup-en-Brie", cp:"10410", cat:3, lastComm:"01/09/2024", avis:"Favorable", statut:"Actif", nbEntreprises:1, nbContacts:1 },
      ],
      4: [
        { id:41, nom:"Leclerc Montgeron — Zone A", adresse:"Av. de la République", ville:"Montgeron", cp:"91230", cat:1, lastComm:"05/01/2022", avis:"Favorable", statut:"Actif", nbEntreprises:2, nbContacts:3 },
        { id:42, nom:"Leclerc Montgeron — Zone B", adresse:"Av. de la République", ville:"Montgeron", cp:"91230", cat:1, lastComm:"10/03/2023", avis:"Favorable", statut:"Actif", nbEntreprises:1, nbContacts:1 },
        { id:43, nom:"Leclerc Montgeron — Zone C", adresse:"Av. de la République", ville:"Montgeron", cp:"91230", cat:1, lastComm:"—",          avis:"Non défini", statut:"Actif", nbEntreprises:0, nbContacts:0 },
      ],
      5: [{ id:51, nom:"Begreen Terville — Principal", adresse:"Zone industrielle", ville:"Terville", cp:"57100", cat:null, lastComm:"—", avis:"Non défini", statut:"Actif", nbEntreprises:1, nbContacts:0 }],
      6: [{ id:61, nom:"Action/Maboul-Jonzac — Principal", adresse:"route de Mirambeau", ville:"Jonzac", cp:"17500", cat:1, lastComm:"—", avis:"Non défini", statut:"Actif", nbEntreprises:1, nbContacts:0 }],
    },
    entreprises: {
      11: [
        { id:111, nom:"SAS Begreen A1",   contact:"Jean Dupont",   email:"j.dupont@begreen.fr",    tel:"06 12 34 56 78", statut:"Client" },
        { id:112, nom:"SARL Verts Toits", contact:"Marie Martin",  email:"m.martin@vertstoits.fr", tel:"06 98 76 54 32", statut:"Client" },
        { id:113, nom:"EURL EcoSpace",    contact:"Paul Roux",     email:"p.roux@ecospace.fr",     tel:"07 11 22 33 44", statut:"Prospect" },
      ],
      12: [{ id:121, nom:"SNC Begreen B1", contact:"Alice Morin", email:"a.morin@begreen.fr", tel:"06 55 44 33 22", statut:"Client" }],
      21: [
        { id:211, nom:"SA Cap Distribution", contact:"Bernard Leroy", email:"b.leroy@capdist.fr",  tel:"06 77 88 99 00", statut:"Client" },
        { id:212, nom:"SAS Saran Invest",    contact:"Clara Petit",   email:"c.petit@saraninv.fr", tel:"06 33 22 11 00", statut:"Prospect" },
      ],
      31: [
        { id:311, nom:"SARL Chênerie", contact:"Marc Durand", email:"m.durand@chenerie.fr", tel:"06 44 55 66 77", statut:"Client" },
        { id:312, nom:"SAS VertBois",  contact:"Lucie Simon", email:"l.simon@vertbois.fr",  tel:"06 88 77 66 55", statut:"Client" },
      ],
      32: [{ id:321, nom:"EURL Bât4B Pro", contact:"Sophie Blanc", email:"s.blanc@bat4b.fr", tel:"07 00 11 22 33", statut:"Client" }],
      41: [
        { id:411, nom:"SAS Leclerc Distribution", contact:"Olivier Noir", email:"o.noir@leclerc.fr", tel:"06 99 88 77 66", statut:"Client" },
        { id:412, nom:"SARL Montgeron Services",  contact:"Emma Gris",   email:"e.gris@mgserv.fr",   tel:"06 11 00 99 88", statut:"Client" },
      ],
      42: [{ id:421, nom:"SNC Leclerc B", contact:"Théo Vert", email:"t.vert@leclerc.fr", tel:"07 22 33 44 55", statut:"Client" }],
      51: [{ id:511, nom:"SAS Terville Pro", contact:"—", email:"—", tel:"—", statut:"Prospect" }],
      61: [{ id:611, nom:"SARL Jonzac", contact:"—", email:"—", tel:"—", statut:"Prospect" }],
    },
    contacts: {
      111: [
        { id:1111, nom:"Jean Dupont",  role:"Gérant",    email:"j.dupont@begreen.fr",    tel:"06 12 34 56 78", lastContact:"05/03/2026" },
        { id:1112, nom:"Lucie Dupont", role:"Comptable", email:"l.dupont@begreen.fr",    tel:"06 12 34 56 79", lastContact:"01/02/2026" },
      ],
      112: [{ id:1121, nom:"Marie Martin",  role:"Directrice",   email:"m.martin@vertstoits.fr", tel:"06 98 76 54 32", lastContact:"10/03/2026" }],
      211: [
        { id:2111, nom:"Bernard Leroy", role:"PDG", email:"b.leroy@capdist.fr",  tel:"06 77 88 99 00", lastContact:"08/03/2026" },
        { id:2112, nom:"Nathalie Roy",  role:"RH",  email:"n.roy@capdist.fr",    tel:"06 77 88 99 01", lastContact:"20/02/2026" },
      ],
      411: [{ id:4111, nom:"Olivier Noir", role:"Directeur", email:"o.noir@leclerc.fr", tel:"06 99 88 77 66", lastContact:"01/03/2026" }],
    },
  };

  // ── STATE ──
  const [activeTab, setActiveTab]   = useState("groupements"); // groupements|etablissements|entreprises|contacts|maintenance
  const [selectedG, setSelectedG]   = useState(null); // groupement sélectionné (panel)
  const [selectedE, setSelectedE]   = useState(null); // etablissement sélectionné
  const [drillG,    setDrillG]      = useState(null); // filtre groupement actif
  const [drillE,    setDrillE]      = useState(null); // filtre etablissement actif
  const [search,    setSearch]      = useState("");
  const [panelItem, setPanelItem]   = useState(null); // item ouvert dans le panel droit
  const [panelType, setPanelType]   = useState(null); // "groupement"|"etablissement"|"entreprise"|"contact"
  const [panelTab,  setPanelTab]    = useState("general");
  const [modalType, setModalType]   = useState(null);
  const [modalForm, setModalForm]   = useState({});
  const [filterAvis, setFilterAvis] = useState("Tous");

  // Helpers
  const nbEtabs    = (gId) => (DATA.etablissements[gId] || []).length;
  const nbEntrepr  = (eId) => (DATA.entreprises[eId] || []).length;
  const nbContacts = (enId) => (DATA.contacts[enId] || []).length;
  const totalEntreprisesForG = (gId) => (DATA.etablissements[gId]||[]).reduce((s,e)=>s+(DATA.entreprises[e.id]||[]).length,0);
  const totalContactsForG    = (gId) => (DATA.etablissements[gId]||[]).reduce((s,e)=>(DATA.entreprises[e.id]||[]).reduce((s2,en)=>s2+(DATA.contacts[en.id]||[]).length,0)+s,0);
  const avisColor = (a) => a==="Favorable"?"#16a34a":a==="Non défini"?"#94a3b8":"#f59e0b";
  const avisClass = (a) => ({background: a==="Favorable"?"rgba(22,163,74,0.1)":a==="Non défini"?"rgba(148,163,184,0.1)":"rgba(245,158,11,0.1)", color: avisColor(a), borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700});

  const openPanel = (item, type) => { setPanelItem(item); setPanelType(type); setPanelTab("general"); };
  const closePanel = () => { setPanelItem(null); setPanelType(null); };

  // Filtered lists
  const filteredGroupements = DATA.groupements.filter(g =>
    (!search || g.nom.toLowerCase().includes(search.toLowerCase()) || g.ville.toLowerCase().includes(search.toLowerCase())) &&
    (filterAvis === "Tous" || g.avis === filterAvis)
  );
  const allEtabs = Object.values(DATA.etablissements).flat().filter(e =>
    !drillG || (DATA.etablissements[drillG]||[]).find(x=>x.id===e.id)
  ).filter(e => !search || e.nom.toLowerCase().includes(search.toLowerCase()));
  const allEntreprises = Object.values(DATA.entreprises).flat().filter(en =>
    !drillE || (DATA.entreprises[drillE]||[]).find(x=>x.id===en.id)
  ).filter(en => !search || en.nom.toLowerCase().includes(search.toLowerCase()));
  const allContacts = Object.values(DATA.contacts).flat().filter(c =>
    !search || c.nom.toLowerCase().includes(search.toLowerCase())
  );

  // Counts for tabs
  const totalEtabs      = Object.values(DATA.etablissements).flat().length;
  const totalEntreprises = Object.values(DATA.entreprises).flat().length;
  const totalContacts    = Object.values(DATA.contacts).flat().length;

  const TabBtn = ({id, icon, label, count}) => (
    <button onClick={() => { setActiveTab(id); setSearch(""); setDrillG(null); setDrillE(null); closePanel(); }}
      style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 16px", border:"none",
        background: activeTab===id ? "white" : "transparent", cursor:"pointer",
        borderRadius:activeTab===id?"8px 8px 0 0":"8px 8px 0 0",
        borderBottom: activeTab===id ? "2px solid var(--primary)" : "2px solid transparent",
        fontWeight: activeTab===id ? 700 : 500, color: activeTab===id ? "var(--primary)" : "var(--text-muted)",
        fontSize:13, transition:"all .15s",
      }}>
      <span style={{fontSize:14}}>{icon}</span>
      {label}
      <span style={{background: activeTab===id?"var(--primary)":"#e2e8f0", color: activeTab===id?"white":"#64748b",
        borderRadius:12, padding:"1px 7px", fontSize:11, fontWeight:700}}>{count}</span>
    </button>
  );

  return (
    <div style={{ display:"flex", gap:0, height:"100%", position:"relative" }}>
      {/* ── MAIN PANEL ── */}
      <div style={{ flex:1, minWidth:0, transition:"all .2s" }}>

        {/* KPI Row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:16 }}>
          {[
            { label:"Groupements",   val:DATA.groupements.length,  icon:"👥", color:"#6366f1", tab:"groupements" },
            { label:"Établissements",val:totalEtabs,                icon:"📍", color:"#0ea5e9", tab:"etablissements" },
            { label:"Entreprises",   val:totalEntreprises,          icon:"🏢", color:"#10b981", tab:"entreprises" },
            { label:"Contacts",      val:totalContacts,             icon:"👤", color:"#f59e0b", tab:"contacts" },
            { label:"Maintenance",   val:0,                         icon:"🔧", color:"#f97316", tab:"maintenance" },
          ].map(k => (
            <div key={k.tab} onClick={() => setActiveTab(k.tab)}
              style={{ background:"var(--card)", borderRadius:12, padding:"14px 16px", cursor:"pointer",
                border: activeTab===k.tab ? `2px solid ${k.color}` : "2px solid transparent",
                boxShadow:"0 1px 4px rgba(0,0,0,.06)", transition:"all .15s" }}>
              <div style={{ fontSize:22, marginBottom:4 }}>{k.icon}</div>
              <div style={{ fontSize:22, fontWeight:800, color:k.color }}>{k.val}</div>
              <div style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Sub-nav tabs */}
        <div style={{ display:"flex", gap:0, borderBottom:"2px solid var(--border)", marginBottom:0, background:"var(--card)", borderRadius:"10px 10px 0 0", padding:"0 8px" }}>
          <TabBtn id="groupements"    icon="👥" label="Groupements"    count={DATA.groupements.length} />
          <TabBtn id="etablissements" icon="📍" label="Établissements" count={totalEtabs} />
          <TabBtn id="entreprises"    icon="🏢" label="Entreprises"    count={totalEntreprises} />
          <TabBtn id="contacts"       icon="👤" label="Contacts"       count={totalContacts} />
          <TabBtn id="maintenance"    icon="🔧" label="Maintenance"    count={0} />
        </div>

        {/* Content area */}
        <div style={{ background:"var(--card)", borderRadius:"0 0 10px 10px", padding:20, boxShadow:"0 1px 4px rgba(0,0,0,.06)" }}>

          {/* Breadcrumb drill-down indicator */}
          {(drillG || drillE) && (
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14, fontSize:12, color:"var(--text-muted)" }}>
              <span style={{cursor:"pointer", color:"var(--primary)", fontWeight:600}} onClick={()=>{setDrillG(null);setDrillE(null);setActiveTab("groupements");}}>Groupements</span>
              {drillG && <><span>›</span><span style={{cursor:"pointer",color:"var(--primary)",fontWeight:600}} onClick={()=>{setDrillE(null);setActiveTab("etablissements");}}>{DATA.groupements.find(g=>g.id===drillG)?.nom}</span></>}
              {drillE && <><span>›</span><span style={{fontWeight:600,color:"var(--text)"}}>{Object.values(DATA.etablissements).flat().find(e=>e.id===drillE)?.nom}</span></>}
              <button onClick={()=>{setDrillG(null);setDrillE(null);}} style={{marginLeft:8,fontSize:11,padding:"2px 8px",border:"1px solid var(--border)",borderRadius:6,background:"transparent",cursor:"pointer",color:"var(--text-muted)"}}>✕ Réinitialiser</button>
            </div>
          )}

          {/* Search + filters */}
          <div style={{ display:"flex", gap:10, marginBottom:16, alignItems:"center" }}>
            <div style={{ position:"relative", flex:1 }}>
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", fontSize:14 }}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Rechercher un ${activeTab === "groupements" ? "groupement" : activeTab === "etablissements" ? "établissement" : activeTab === "entreprises" ? "entreprise" : "contact"}...`}
                style={{ width:"100%", padding:"8px 10px 8px 32px", border:"1.5px solid var(--border)", borderRadius:8, fontSize:13, background:"var(--bg)", color:"var(--text)" }} />
            </div>
            {activeTab === "groupements" && (
              <select value={filterAvis} onChange={e=>setFilterAvis(e.target.value)}
                style={{ padding:"8px 12px", border:"1.5px solid var(--border)", borderRadius:8, fontSize:13, background:"var(--bg)", color:"var(--text)" }}>
                <option>Tous les avis</option>
                <option>Favorable</option>
                <option>Non défini</option>
                <option>Défavorable</option>
              </select>
            )}
            <Btn onClick={() => { setModalType(activeTab === "groupements" ? "groupement" : activeTab === "etablissements" ? "etablissement" : activeTab === "entreprises" ? "entreprise" : "contact"); setModalForm({}); }}>
              + Nouveau {activeTab === "groupements" ? "Groupement" : activeTab === "etablissements" ? "Établissement" : activeTab === "entreprises" ? "Entreprise" : "Contact"}
            </Btn>
            <button style={{ padding:"8px 14px", border:"1.5px solid var(--border)", borderRadius:8, fontSize:13, background:"var(--bg)", color:"var(--text-muted)", cursor:"pointer" }}>⬇ Exporter</button>
          </div>

          {/* ── GROUPEMENTS TABLE ── */}
          {activeTab === "groupements" && (
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border)" }}>
                  {["Nom","Adresse","Ville","Code Postal","Catégorie","Date dernière commission","Périodicité (ans)","Date prochaine commission","Fréquence visites (ans)","Avis","Établissements","Statut"].map(h=>(
                    <th key={h} style={{ padding:"8px 10px", textAlign:"left", fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredGroupements.map(g => (
                  <tr key={g.id} onClick={()=>openPanel(g,"groupement")}
                    style={{ borderBottom:"1px solid var(--border)", cursor:"pointer", transition:"background .1s",
                      background: panelItem?.id===g.id ? "rgba(var(--primary-rgb),.06)" : "transparent" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(var(--primary-rgb),.04)"}
                    onMouseLeave={e=>e.currentTarget.style.background=panelItem?.id===g.id?"rgba(var(--primary-rgb),.06)":"transparent"}>
                    <td style={{ padding:"10px", fontWeight:700, color:"var(--primary)", whiteSpace:"nowrap" }}>{g.nom}</td>
                    <td style={{ padding:"10px", color:"var(--text-muted)", fontSize:12, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{g.adresse}</td>
                    <td style={{ padding:"10px", whiteSpace:"nowrap" }}>{g.ville}</td>
                    <td style={{ padding:"10px" }}>{g.cp}</td>
                    <td style={{ padding:"10px" }}>{g.cat ?? "—"}</td>
                    <td style={{ padding:"10px", whiteSpace:"nowrap" }}>{g.lastComm}</td>
                    <td style={{ padding:"10px" }}>{g.period ?? "—"}</td>
                    <td style={{ padding:"10px", whiteSpace:"nowrap" }}>{g.nextComm}</td>
                    <td style={{ padding:"10px" }}>{g.freqVisites ?? "—"}</td>
                    <td style={{ padding:"10px" }}><span style={avisClass(g.avis)}>{g.avis}</span></td>
                    <td style={{ padding:"10px" }}>
                      <span onClick={e=>{e.stopPropagation();setDrillG(g.id);setActiveTab("etablissements");}}
                        style={{ color:"var(--primary)", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                        <span style={{background:"rgba(var(--primary-rgb),.1)",borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>⊙</span>
                        {nbEtabs(g.id)}
                      </span>
                    </td>
                    <td style={{ padding:"10px" }}><span style={{background:"rgba(16,185,129,.1)",color:"#10b981",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700}}>{g.statut}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ── ÉTABLISSEMENTS TABLE ── */}
          {activeTab === "etablissements" && (
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border)" }}>
                  {["Nom","Adresse","Ville","CP","Catégorie","Dernière commission","Avis","Entreprises","Contacts","Statut"].map(h=>(
                    <th key={h} style={{ padding:"8px 10px", textAlign:"left", fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(drillG ? (DATA.etablissements[drillG]||[]) : Object.values(DATA.etablissements).flat())
                  .filter(e => !search || e.nom.toLowerCase().includes(search.toLowerCase()))
                  .map(e => (
                  <tr key={e.id} onClick={()=>openPanel(e,"etablissement")}
                    style={{ borderBottom:"1px solid var(--border)", cursor:"pointer" }}
                    onMouseEnter={ev=>ev.currentTarget.style.background="rgba(var(--primary-rgb),.04)"}
                    onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"10px", fontWeight:700, color:"var(--primary)" }}>{e.nom}</td>
                    <td style={{ padding:"10px", color:"var(--text-muted)", fontSize:12 }}>{e.adresse}</td>
                    <td style={{ padding:"10px" }}>{e.ville}</td>
                    <td style={{ padding:"10px" }}>{e.cp}</td>
                    <td style={{ padding:"10px" }}>{e.cat ?? "—"}</td>
                    <td style={{ padding:"10px", whiteSpace:"nowrap" }}>{e.lastComm}</td>
                    <td style={{ padding:"10px" }}><span style={avisClass(e.avis)}>{e.avis}</span></td>
                    <td style={{ padding:"10px" }}>
                      <span onClick={ev=>{ev.stopPropagation();setDrillE(e.id);setActiveTab("entreprises");}}
                        style={{ color:"var(--primary)", fontWeight:700, cursor:"pointer" }}>
                        ⊙ {nbEntrepr(e.id)}
                      </span>
                    </td>
                    <td style={{ padding:"10px" }}>{(DATA.entreprises[e.id]||[]).reduce((s,en)=>s+(DATA.contacts[en.id]||[]).length,0)}</td>
                    <td style={{ padding:"10px" }}><span style={{background:"rgba(16,185,129,.1)",color:"#10b981",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700}}>{e.statut}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ── ENTREPRISES TABLE ── */}
          {activeTab === "entreprises" && (
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border)" }}>
                  {["Nom","Contact principal","Email","Téléphone","Contacts","Statut","Actions"].map(h=>(
                    <th key={h} style={{ padding:"8px 10px", textAlign:"left", fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(drillE ? (DATA.entreprises[drillE]||[]) : Object.values(DATA.entreprises).flat())
                  .filter(en => !search || en.nom.toLowerCase().includes(search.toLowerCase()))
                  .map(en => (
                  <tr key={en.id} onClick={()=>openPanel(en,"entreprise")}
                    style={{ borderBottom:"1px solid var(--border)", cursor:"pointer" }}
                    onMouseEnter={ev=>ev.currentTarget.style.background="rgba(var(--primary-rgb),.04)"}
                    onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"10px", fontWeight:700, color:"var(--primary)" }}>{en.nom}</td>
                    <td style={{ padding:"10px" }}>{en.contact}</td>
                    <td style={{ padding:"10px", color:"var(--text-muted)", fontSize:12 }}>{en.email}</td>
                    <td style={{ padding:"10px" }}>{en.tel}</td>
                    <td style={{ padding:"10px" }}>
                      <span style={{ color:"var(--primary)", fontWeight:700, cursor:"pointer" }} onClick={ev=>{ev.stopPropagation();openPanel(en,"entreprise");setPanelTab("contacts");}}>
                        👤 {nbContacts(en.id)}
                      </span>
                    </td>
                    <td style={{ padding:"10px" }}>
                      <span style={{background:en.statut==="Client"?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)",color:en.statut==="Client"?"#10b981":"#f59e0b",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700}}>{en.statut}</span>
                    </td>
                    <td style={{ padding:"10px" }}>
                      <button onClick={ev=>{ev.stopPropagation();openPanel(en,"entreprise");}} style={{padding:"4px 10px",border:"1px solid var(--primary)",borderRadius:6,background:"transparent",color:"var(--primary)",cursor:"pointer",fontSize:11}}>Voir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ── CONTACTS TABLE ── */}
          {activeTab === "contacts" && (
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border)" }}>
                  {["Nom","Rôle","Email","Téléphone","Dernier contact","Actions"].map(h=>(
                    <th key={h} style={{ padding:"8px 10px", textAlign:"left", fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(DATA.contacts).flat()
                  .filter(c => !search || c.nom.toLowerCase().includes(search.toLowerCase()))
                  .map(c => (
                  <tr key={c.id} onClick={()=>openPanel(c,"contact")}
                    style={{ borderBottom:"1px solid var(--border)", cursor:"pointer" }}
                    onMouseEnter={ev=>ev.currentTarget.style.background="rgba(var(--primary-rgb),.04)"}
                    onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"10px", fontWeight:700, color:"var(--primary)" }}>👤 {c.nom}</td>
                    <td style={{ padding:"10px" }}><span style={{background:"rgba(99,102,241,.1)",color:"#6366f1",borderRadius:6,padding:"2px 8px",fontSize:11}}>{c.role}</span></td>
                    <td style={{ padding:"10px", color:"var(--text-muted)", fontSize:12 }}>{c.email}</td>
                    <td style={{ padding:"10px" }}>{c.tel}</td>
                    <td style={{ padding:"10px", color:"var(--text-muted)", fontSize:12 }}>{c.lastContact}</td>
                    <td style={{ padding:"10px" }}>
                      <button onClick={ev=>{ev.stopPropagation();openPanel(c,"contact");}} style={{padding:"4px 10px",border:"1px solid var(--primary)",borderRadius:6,background:"transparent",color:"var(--primary)",cursor:"pointer",fontSize:11}}>Voir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ── MAINTENANCE ── */}
          {activeTab === "maintenance" && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"var(--text-muted)" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
              <div style={{ fontSize:16, fontWeight:600 }}>Aucune maintenance en cours</div>
              <div style={{ fontSize:13, marginTop:6 }}>Les interventions de maintenance apparaîtront ici</div>
              <Btn style={{ marginTop:20 }} onClick={()=>{}}>+ Nouvelle maintenance</Btn>
            </div>
          )}
        </div>
      </div>

      {/* ── SIDE PANEL (detail) ── */}
      {panelItem && (
        <div style={{ width:440, marginLeft:16, background:"white", borderRadius:16, boxShadow:"0 8px 32px rgba(0,0,0,.14)", overflow:"hidden", display:"flex", flexDirection:"column", maxHeight:"calc(100vh - 120px)", position:"sticky", top:0, border:"1px solid #e8eaf0" }}>
          
          {/* Panel header — exact PREVERIS style */}
          <div style={{ background:"linear-gradient(135deg, #7c6fcd 0%, #9b8fe0 50%, #b8a9e8 100%)", padding:"22px 20px 18px", position:"relative" }}>
            <button onClick={closePanel} style={{ position:"absolute", right:14, top:14, background:"rgba(255,255,255,.25)", border:"none", borderRadius:"50%", width:30, height:30, cursor:"pointer", color:"white", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:300 }}>×</button>
            
            <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
              <div style={{ width:56, height:56, borderRadius:14, background:"rgba(255,255,255,.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
                {panelType==="groupement"?"👥":panelType==="etablissement"?"📍":panelType==="entreprise"?"🏢":"👤"}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ color:"white", fontWeight:800, fontSize:18, lineHeight:1.2, marginBottom:4 }}>{panelItem.nom}</div>
                <div style={{ color:"rgba(255,255,255,.85)", fontSize:12, marginBottom:6 }}>{panelItem.adresse || panelItem.email || panelItem.role || ""}</div>
                {panelItem.statut && (
                  <span style={{ background:"rgba(255,255,255,.22)", color:"white", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{panelItem.statut}</span>
                )}
              </div>
            </div>

            {/* KPI row — cards blanches comme PREVERIS */}
            {panelType === "groupement" && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:16 }}>
                {[
                  { val:nbEtabs(panelItem.id), label:"Étab.", click:()=>{setDrillG(panelItem.id);setActiveTab("etablissements");closePanel();} },
                  { val:totalEntreprisesForG(panelItem.id), label:"Entr.", click:null },
                  { val:totalContactsForG(panelItem.id), label:"Contacts", click:null },
                  { val:0, label:"Projets", click:null },
                ].map((k,i)=>(
                  <div key={i} onClick={k.click}
                    style={{ background:"rgba(255,255,255,.18)", borderRadius:10, padding:"10px 6px", textAlign:"center", cursor:k.click?"pointer":"default",
                      border:"1px solid rgba(255,255,255,.15)", transition:"background .15s" }}
                    onMouseEnter={e=>k.click&&(e.currentTarget.style.background="rgba(255,255,255,.28)")}
                    onMouseLeave={e=>k.click&&(e.currentTarget.style.background="rgba(255,255,255,.18)")}>
                    <div style={{ color:"white", fontWeight:800, fontSize:20, lineHeight:1 }}>{k.val}</div>
                    <div style={{ color:"rgba(255,255,255,.8)", fontSize:10, marginTop:3, fontWeight:500 }}>{k.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panel sub-tabs — style PREVERIS */}
          <div style={{ display:"flex", borderBottom:"1px solid #eaecf0", padding:"0 12px", background:"white", overflowX:"auto" }}>
            {(panelType==="groupement"
              ? [{id:"general",label:"Général"},{id:"etabs",label:`Étab. ${nbEtabs(panelItem.id)}`},{id:"entreprises",label:`Entr. ${totalEntreprisesForG(panelItem.id)}`},{id:"contacts",label:`Contacts ${totalContactsForG(panelItem.id)}`},{id:"projets",label:"Projets"},{id:"comm",label:"Comm. 1"}]
              : panelType==="etablissement"
              ? [{id:"general",label:"Général"},{id:"entreprises",label:`Entr. ${nbEntrepr(panelItem.id)}`},{id:"contacts",label:"Contacts"}]
              : panelType==="entreprise"
              ? [{id:"general",label:"Général"},{id:"contacts",label:`Contacts ${nbContacts(panelItem.id)}`},{id:"projets",label:"Projets"}]
              : [{id:"general",label:"Général"}]
            ).map(t=>(
              <button key={t.id} onClick={()=>setPanelTab(t.id)}
                style={{ padding:"10px 14px", border:"none", background:"transparent", cursor:"pointer", fontSize:13,
                  fontWeight: panelTab===t.id ? 700 : 400,
                  color: panelTab===t.id ? "#e85d26" : "#64748b",
                  borderBottom: panelTab===t.id ? "2.5px solid #e85d26" : "2.5px solid transparent",
                  whiteSpace:"nowrap", transition:"all .15s" }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div style={{ flex:1, overflow:"auto", padding:16, background:"white" }}>

            {/* Général tab */}
            {panelTab === "general" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {panelType==="groupement" && (
                  <>
                    <Section title="Informations Commissions">
                      <Row label="Dernière commission" val={panelItem.lastComm || "Non définie"} />
                      <Row label="Périodicité" val={panelItem.period ? `${panelItem.period} ans` : "Non définie"} />
                      <Row label="Prochaine commission" val={panelItem.nextComm || "Non définie"} />
                      <Row label="Fréquence visites" val={panelItem.freqVisites ? `${panelItem.freqVisites} ans` : "Non définie"} />
                    </Section>
                    <Section title="Coordonnées">
                      <Row label="Adresse" val={panelItem.adresse} />
                      <Row label="Ville" val={panelItem.ville} />
                      <Row label="Code postal" val={panelItem.cp} />
                      <Row label="Catégorie" val={panelItem.cat ?? "—"} />
                    </Section>
                  </>
                )}
                {(panelType==="etablissement"||panelType==="entreprise") && (
                  <Section title="Coordonnées">
                    <Row label="Adresse" val={panelItem.adresse || "—"} />
                    <Row label="Ville" val={panelItem.ville || "—"} />
                    <Row label="Email" val={panelItem.email || "—"} />
                    <Row label="Téléphone" val={panelItem.tel || "—"} />
                  </Section>
                )}
                {panelType==="contact" && (
                  <Section title="Coordonnées">
                    <Row label="Rôle" val={panelItem.role} />
                    <Row label="Email" val={panelItem.email} />
                    <Row label="Téléphone" val={panelItem.tel} />
                    <Row label="Dernier contact" val={panelItem.lastContact} />
                  </Section>
                )}
                <div style={{ display:"flex", gap:8, marginTop:8 }}>
                  <Btn outline onClick={()=>{ setModalType(panelType); setModalForm({...panelItem}); }}>✏️ Modifier</Btn>
                </div>
              </div>
            )}

            {/* Établissements tab (in groupement panel) */}
            {panelTab === "etabs" && panelType==="groupement" && (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {(DATA.etablissements[panelItem.id]||[]).map(e=>(
                  <div key={e.id} onClick={()=>{setDrillG(panelItem.id);setActiveTab("etablissements");closePanel();}}
                    style={{ padding:"12px", border:"1px solid var(--border)", borderRadius:8, cursor:"pointer", transition:"all .15s" }}
                    onMouseEnter={ev=>ev.currentTarget.style.background="rgba(var(--primary-rgb),.04)"}
                    onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
                    <div style={{ fontWeight:700, color:"var(--primary)", marginBottom:4 }}>📍 {e.nom}</div>
                    <div style={{ fontSize:12, color:"var(--text-muted)" }}>{e.ville} — {nbEntrepr(e.id)} entreprises</div>
                  </div>
                ))}
                <Btn outline onClick={()=>{setModalType("etablissement");setModalForm({groupementId:panelItem.id});}}>+ Nouvel établissement</Btn>
              </div>
            )}

            {/* Entreprises tab */}
            {panelTab === "entreprises" && (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {(panelType==="groupement"
                  ? (DATA.etablissements[panelItem.id]||[]).flatMap(e=>DATA.entreprises[e.id]||[])
                  : DATA.entreprises[panelItem.id]||[]
                ).map(en=>(
                  <div key={en.id} style={{ padding:"12px", border:"1px solid var(--border)", borderRadius:8 }}>
                    <div style={{ fontWeight:700, color:"var(--primary)" }}>🏢 {en.nom}</div>
                    <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{en.contact} — {en.tel}</div>
                    <span style={{background:en.statut==="Client"?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)",color:en.statut==="Client"?"#10b981":"#f59e0b",borderRadius:6,padding:"2px 6px",fontSize:10,fontWeight:700,marginTop:4,display:"inline-block"}}>{en.statut}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Contacts tab */}
            {panelTab === "contacts" && (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {(panelType==="entreprise" ? (DATA.contacts[panelItem.id]||[]) : Object.values(DATA.contacts).flat()).map(c=>(
                  <div key={c.id} style={{ padding:"14px 16px", border:"1px solid #eaecf0", borderRadius:10, background:"white", marginBottom:2, boxShadow:"0 1px 3px rgba(0,0,0,.05)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                      <div style={{ width:34, height:34, borderRadius:"50%", background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>👤</div>
                      <div style={{ fontWeight:700, fontSize:15, color:"#1e293b" }}>{c.nom}</div>
                    </div>
                    <div style={{ fontSize:12, color:"#64748b", paddingLeft:44 }}>{c.role} — {c.email}</div>
                    <div style={{ fontSize:12, color:"#64748b", paddingLeft:44, marginTop:2 }}>{c.tel}</div>
                  </div>
                ))}
                <Btn outline onClick={()=>{setModalType("contact");setModalForm({entrepriseId:panelItem.id});}}>+ Nouveau contact</Btn>
              </div>
            )}

            {/* Projets tab */}
            {panelTab === "projets" && (
              <div style={{ textAlign:"center", padding:"30px", color:"var(--text-muted)", fontSize:13 }}>
                <div style={{fontSize:32,marginBottom:8}}>📁</div>
                Aucun projet associé
              </div>
            )}

            {/* Comm tab */}
            {panelTab === "comm" && (
              <div style={{ textAlign:"center", padding:"30px", color:"var(--text-muted)", fontSize:13 }}>
                <div style={{fontSize:32,marginBottom:8}}>📅</div>
                Historique des commissions
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL CREATION / EDITION ── */}
      {modalType && (
        <Modal title={`${modalForm.id ? "Modifier" : "Nouveau"} ${modalType}`} onClose={()=>setModalType(null)}>
          {modalType === "groupement" && <>
            <Field label="Nom" value={modalForm.nom||""} onChange={v=>setModalForm(p=>({...p,nom:v}))} />
            <Field label="Adresse" value={modalForm.adresse||""} onChange={v=>setModalForm(p=>({...p,adresse:v}))} />
            <Field label="Ville" value={modalForm.ville||""} onChange={v=>setModalForm(p=>({...p,ville:v}))} />
            <Field label="Code postal" value={modalForm.cp||""} onChange={v=>setModalForm(p=>({...p,cp:v}))} />
            <Field label="Catégorie" value={modalForm.cat||""} onChange={v=>setModalForm(p=>({...p,cat:v}))} type="number" />
            <Field label="Avis" value={modalForm.avis||""} onChange={v=>setModalForm(p=>({...p,avis:v}))} options={["Favorable","Non défini","Défavorable"]} />
            <Field label="Périodicité (ans)" value={modalForm.period||""} onChange={v=>setModalForm(p=>({...p,period:v}))} type="number" />
            <Field label="Date dernière commission" value={modalForm.lastComm||""} onChange={v=>setModalForm(p=>({...p,lastComm:v}))} type="date" />
          </>}
          {modalType === "etablissement" && <>
            <Field label="Groupement" value={modalForm.groupementId||""} onChange={v=>setModalForm(p=>({...p,groupementId:v}))} options={DATA.groupements.map(g=>g.nom)} />
            <Field label="Nom" value={modalForm.nom||""} onChange={v=>setModalForm(p=>({...p,nom:v}))} />
            <Field label="Adresse" value={modalForm.adresse||""} onChange={v=>setModalForm(p=>({...p,adresse:v}))} />
            <Field label="Ville" value={modalForm.ville||""} onChange={v=>setModalForm(p=>({...p,ville:v}))} />
            <Field label="Code postal" value={modalForm.cp||""} onChange={v=>setModalForm(p=>({...p,cp:v}))} />
          </>}
          {modalType === "entreprise" && <>
            <Field label="Nom" value={modalForm.nom||""} onChange={v=>setModalForm(p=>({...p,nom:v}))} />
            <Field label="Contact principal" value={modalForm.contact||""} onChange={v=>setModalForm(p=>({...p,contact:v}))} />
            <Field label="Email" value={modalForm.email||""} onChange={v=>setModalForm(p=>({...p,email:v}))} />
            <Field label="Téléphone" value={modalForm.tel||""} onChange={v=>setModalForm(p=>({...p,tel:v}))} />
            <Field label="Statut" value={modalForm.statut||""} onChange={v=>setModalForm(p=>({...p,statut:v}))} options={["Client","Prospect"]} />
          </>}
          {modalType === "contact" && <>
            <Field label="Nom" value={modalForm.nom||""} onChange={v=>setModalForm(p=>({...p,nom:v}))} />
            <Field label="Rôle" value={modalForm.role||""} onChange={v=>setModalForm(p=>({...p,role:v}))} />
            <Field label="Email" value={modalForm.email||""} onChange={v=>setModalForm(p=>({...p,email:v}))} />
            <Field label="Téléphone" value={modalForm.tel||""} onChange={v=>setModalForm(p=>({...p,tel:v}))} />
          </>}
          <div className="modal-footer">
            <Btn outline onClick={()=>setModalType(null)}>Annuler</Btn>
            <Btn onClick={()=>{ alert("✅ Enregistré !"); setModalType(null); }}>
              {modalForm.id ? "Enregistrer" : "Créer"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Helpers pour le panel ──
function Section({title, children}) {
  return (
    <div style={{ border:"1px solid #eaecf0", borderRadius:10, overflow:"hidden", marginBottom:12 }}>
      <div style={{ background:"#f8fafc", padding:"9px 14px", fontSize:12, fontWeight:700, color:"#64748b", borderBottom:"1px solid #eaecf0", textTransform:"uppercase", letterSpacing:"0.5px" }}>{title}</div>
      <div style={{ padding:"4px 0", background:"white" }}>{children}</div>
    </div>
  );
}
function Row({label, val}) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", fontSize:13, borderBottom:"1px solid #f1f5f9" }}>
      <span style={{ color:"#64748b", fontWeight:500 }}>{label}</span>
      <span style={{ fontWeight:600, color:"#1e293b" }}>{val || "—"}</span>
    </div>
  );
}

function CRMProspectsTab() {
  const PROSPECTS = [
    { id:1, nom:"Reveyron", contact:"Maxime MOREAU", email:"mmoreau@keops.com", tel:"07 88 28 02 64", valeur:0, statut:"Prospect", score:10, temp:"Très froid" },
    { id:2, nom:"Domaine de la Tremblay", contact:"Maéva KAVEGE", email:"maevakavege@gmail.com", tel:"0685869054", valeur:0, statut:"Prospect", score:15, temp:"Tiède" },
    { id:3, nom:"DIAMOND PALACE", contact:"Ivana VRATONJIC", email:"iv.archidesign@gmail.com", tel:"0699017674", valeur:0, statut:"Devis envoyé", score:18, temp:"Chaud" },
    { id:4, nom:"4CHEM1EVOLUTION", contact:"Lynda ZITOUNI", email:"l.zitouni@4ce.asso.fr", tel:"0659529673", valeur:0, statut:"Prospect", score:5, temp:"Très froid" },
    { id:5, nom:"Magnum Photos", contact:"Anne-Lise Fotso", email:"anne-lise.fotso@magnumphotos.com", tel:"0620642301", valeur:0, statut:"Négociation", score:22, temp:"Très chaud" },
    { id:6, nom:"Sonadev", contact:"marine Drouet", email:"drouetm1@sonadev.fr", tel:"0761723056", valeur:0, statut:"Prospect", score:5, temp:"Très froid" },
    { id:7, nom:"AGRI PLUS", contact:"Jean-Baptiste Cornu-Langy", email:"jb.cornulangy@irripieces.fr", tel:"06 15 98 07 81", valeur:0, statut:"Prospect", score:5, temp:"Très froid" },
    { id:8, nom:"VIA SANA", contact:"Paul Robic", email:"paulrobic@centreviasana.com", tel:"07 45 05 37 10", valeur:0, statut:"Prospect", score:8, temp:"Froid" },
  ];

  const tempColor = t => ({ "Très froid":"#94a3b8","Froid":"#60a5fa","Tiède":"#f59e0b","Chaud":"#fb923c","Très chaud":"#ef4444" })[t] || "#94a3b8";

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">🎯 Gestion des Prospects</h2>
          <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>780 prospects · Scoring IA automatique</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn outline>📥 Importer</Btn>
          <Btn outline>📤 Exporter</Btn>
          <Btn>＋ Nouveau Prospect</Btn>
        </div>
      </div>

      {/* IA suggestion box */}
      <div style={{ background:"linear-gradient(135deg,rgba(var(--primary-rgb),0.06),rgba(139,92,246,0.06))", border:"1px solid rgba(var(--primary-rgb),0.2)", borderRadius:12, padding:14, marginBottom:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:32, height:32, background:"var(--primary)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
          <div>
            <div style={{ fontWeight:700, fontSize:14 }}>Assistant IA — Analyse des Prospects</div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>Suggestions basées sur l'activité et le scoring</div>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["📊 Quels prospects relancer cette semaine ?","🎯 Prospects avec fort potentiel","⚠️ Prospects inactifs > 30 jours","📈 Analyser le taux de conversion"].map(s => (
            <span key={s} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:20, padding:"6px 14px", fontSize:12, cursor:"pointer", color:"var(--text-secondary)" }}>{s}</span>
          ))}
        </div>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr>
            {["Entreprise","Contact","Email","Téléphone","Score IA","Température","Statut","Action"].map(h => (
              <th key={h} style={{ textAlign:"left", padding:"9px 12px", color:"var(--text-muted)", fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:0.8, borderBottom:"1px solid var(--border)", whiteSpace:"nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROSPECTS.map(p => (
            <tr key={p.id}>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", fontWeight:600 }}>{p.nom}</td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)" }}>{p.contact}</td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", color:"var(--text-muted)", fontSize:12 }}>{p.email}</td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", color:"var(--text-muted)" }}>{p.tel}</td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontWeight:700, color:"var(--primary)" }}>{p.score}</span>
                <div style={{ width:60, height:5, background:"var(--border)", borderRadius:3, overflow:"hidden", display:"inline-block", marginLeft:8, verticalAlign:"middle" }}>
                  <div style={{ width:`${p.score*4}%`, height:"100%", background:"var(--primary)", borderRadius:3 }}></div>
                </div>
              </td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)" }}>
                <span style={{ padding:"2px 9px", borderRadius:20, fontSize:11, fontWeight:600, background:tempColor(p.temp)+"22", color:tempColor(p.temp) }}>{p.temp}</span>
              </td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)" }}>
                <span style={{ padding:"2px 9px", borderRadius:20, fontSize:11, fontWeight:600, background:"rgba(245,158,11,0.12)", color:"#d97706" }}>{p.statut}</span>
              </td>
              <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)" }}>
                <button style={{ background:"rgba(var(--primary-rgb),0.1)", color:"var(--primary)", border:"none", padding:"4px 10px", borderRadius:6, fontSize:12, cursor:"pointer" }}>Relancer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding:"10px 12px", fontSize:12, color:"var(--text-muted)", textAlign:"center" }}>Affichage de 1 à 8 sur 780 résultats</div>
    </div>
  );
}

// ── TAB 4: TABLEAU DE BORD ─────────────────────────────────
function CRMTableauTab() {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📈 Tableau de Bord Commercial</h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[
          { label:"Taux de conversion", val:"63%", sub:"17 gagnées / 27 fermées", color:"var(--primary)" },
          { label:"Valeur du Pipeline", val:"0 €", sub:"367 opportunités en cours", color:"#3b82f6" },
          { label:"Panier Moyen", val:"0 €", sub:"Valeur moy. par affaire gagnée", color:"#10b981" },
          { label:"Cycle de Vente Moyen", val:"0 j", sub:"Temps moyen de conversion", color:"#f59e0b" },
        ].map(k => (
          <div key={k.label} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 18px", borderTop:`3px solid ${k.color}` }}>
            <div style={{ fontSize:26, fontWeight:800, color:k.color }}>{k.val}</div>
            <div style={{ fontSize:12, color:"var(--text-secondary)", marginTop:4, fontWeight:600 }}>{k.label}</div>
            <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
        {/* Pipeline bars */}
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:16 }}>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:14 }}>📊 Répartition du Pipeline</div>
          {[
            { label:"Nouveaux Leads", val:666, total:780, color:"#3b82f6" },
            { label:"Qualifiés",      val:35,  total:780, color:"#10b981" },
            { label:"Devis Envoyés",  val:46,  total:780, color:"#f59e0b" },
            { label:"Négociation",    val:6,   total:780, color:"var(--primary)" },
            { label:"Gagnés",         val:17,  total:780, color:"#059669" },
          ].map(b => (
            <div key={b.label} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ fontSize:12, color:"var(--text-muted)", width:120 }}>{b.label}</div>
              <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ width:`${(b.val/b.total*100).toFixed(0)}%`, height:"100%", background:b.color, borderRadius:4 }}></div>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:b.color, width:30 }}>{b.val}</div>
            </div>
          ))}
        </div>

        {/* Commerciaux */}
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:16 }}>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:14 }}>👥 Performance Commerciaux</div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr>
                {["Commercial","Opport.","Gagnées","Conv."].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"6px 8px", fontSize:11, color:"var(--text-muted)", fontWeight:600, borderBottom:"1px solid var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[{nom:"hamdi ayari",opps:54,gain:0},{nom:"Hugo Bouchez",opps:6,gain:0}].map(c => (
                <tr key={c.nom}>
                  <td style={{ padding:"8px 8px", borderBottom:"1px solid var(--border)" }}>{c.nom}</td>
                  <td style={{ padding:"8px 8px", borderBottom:"1px solid var(--border)" }}>{c.opps}</td>
                  <td style={{ padding:"8px 8px", borderBottom:"1px solid var(--border)", color:"var(--text-muted)" }}>{c.gain}</td>
                  <td style={{ padding:"8px 8px", borderBottom:"1px solid var(--border)", color:"#ef4444", fontWeight:700 }}>0%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop:12, padding:"8px 12px", background:"rgba(239,68,68,0.07)", borderRadius:8, fontSize:12, color:"#ef4444" }}>
            ⚠️ Les montants ne sont pas renseignés. Le module Comptabilité permettra de corriger cela.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB 5: COMPTABILITÉ (NEW) ──────────────────────────────
function CRMComptaTab({ factures: propFactures, setFactures: propSetFactures, projets }) {
  const FACTURES_INIT = [
    { num:"FAC-001", client:"Mutuelle des Architectes", date:"01/03/2026", echeance:"31/03/2026", montant:4200, statut:"En attente" },
    { num:"FAC-002", client:"Institut Saint-Dominique", date:"15/02/2026", echeance:"15/03/2026", montant:1800, statut:"Payée" },
    { num:"FAC-003", client:"APEC", date:"10/02/2026", echeance:"10/03/2026", montant:3600, statut:"En retard" },
    { num:"FAC-004", client:"Centre National de la Danse", date:"05/02/2026", echeance:"05/03/2026", montant:2400, statut:"Payée" },
    { num:"FAC-005", client:"Magnum Photos", date:"01/02/2026", echeance:"01/03/2026", montant:5100, statut:"En attente" },
  ];

  const [_factures, _setFactures] = useLocalStorage("crm_factures", FACTURES_INIT);
  const factures    = propFactures    !== undefined ? propFactures    : _factures;
  const setFactures = propSetFactures !== undefined ? propSetFactures : _setFactures;
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({});
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));

  const nextNum = () => {
    const nums = factures.map(f => parseInt(f.num.replace("FAC-",""))||0);
    return "FAC-" + String(Math.max(0,...nums)+1).padStart(3,"0");
  };

  const saveFacture = () => {
    if (modal === "new") {
      setFactures(prev => [...prev, { ...form, num: nextNum(), montant: Number(form.montant)||0 }]);
    } else {
      setFactures(prev => prev.map(f => f.num === form.num ? { ...form, montant: Number(form.montant)||0 } : f));
    }
    setModal(null);
  };

  const deleteFacture = (num) => setFactures(prev => prev.filter(f => f.num !== num));

  const statutColor = s => ({ "Payée":"#10b981","En attente":"#f59e0b","En retard":"#ef4444" })[s] || "#94a3b8";
  const totalCA     = factures.reduce((a,f)=>a+Number(f.montant),0);
  const totalPayee  = factures.filter(f=>f.statut==="Payée").reduce((a,f)=>a+Number(f.montant),0);
  const totalRetard = factures.filter(f=>f.statut==="En retard").reduce((a,f)=>a+Number(f.montant),0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">💰 Module Comptabilité</h2>
          <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>Suivi financier par client · Moteur IA</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn outline>📤 Exporter PDF</Btn>
          <Btn onClick={() => { setForm({ client:"", date:today(), echeance:"", montant:"", statut:"En attente" }); setModal("new"); }}>＋ Nouvelle Facture</Btn>
        </div>
      </div>

      {/* KPIs compta */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:20 }}>
        {[
          { label:"CA Total",          val:totalCA.toLocaleString()+" €",   color:"#10b981" },
          { label:"Factures émises",   val:factures.length,                 color:"var(--primary)" },
          { label:"Montant payé",      val:totalPayee.toLocaleString()+" €",color:"#3b82f6" },
          { label:"En attente",        val:"En attente",                    color:"#f59e0b" },
          { label:"En retard",         val:totalRetard.toLocaleString()+" €",color:"#ef4444" },
        ].map(k => (
          <div key={k.label} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 18px", borderTop:`3px solid ${k.color}` }}>
            <div style={{ fontSize:22, fontWeight:800, color:k.color }}>{k.val}</div>
            <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* IA box */}
      <div style={{ background:"linear-gradient(135deg,rgba(var(--primary-rgb),0.06),rgba(139,92,246,0.06))", border:"1px solid rgba(var(--primary-rgb),0.2)", borderRadius:12, padding:14, marginBottom:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:32, height:32, background:"var(--primary)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14 }}>Moteur IA — Analyse Comptable</div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>Détection d'anomalies · Prédiction CA · Alertes paiement</div>
          </div>
          <span style={{ background:"rgba(139,92,246,0.12)", color:"#8b5cf6", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600 }}>En développement</span>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["💰 Clients avec factures impayées","📊 Prévision CA prochain trimestre","⚠️ Clients à risque de non-paiement","📈 Analyse de rentabilité par client"].map(s => (
            <span key={s} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:20, padding:"6px 14px", fontSize:12, cursor:"pointer", color:"var(--text-secondary)" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Table factures */}
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:14 }}>
        <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>🧾 Factures récentes</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr>
              {["N° Facture","Client","Date émission","Échéance","Montant","Statut","Action"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"8px 12px", color:"var(--text-muted)", fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:0.6, borderBottom:"1px solid var(--border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {factures.map(fac => (
              <tr key={fac.num}>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", fontWeight:700, color:"var(--primary)" }}>{fac.num}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", fontWeight:600 }}>{fac.client}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", color:"var(--text-muted)" }}>{fac.date}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", color:"var(--text-muted)" }}>{fac.echeance}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", fontWeight:700, color:"#10b981" }}>{Number(fac.montant).toLocaleString()} €</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)" }}>
                  <span style={{ padding:"2px 9px", borderRadius:20, fontSize:11, fontWeight:600, background:statutColor(fac.statut)+"22", color:statutColor(fac.statut) }}>{fac.statut}</span>
                </td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--border)", display:"flex", gap:6 }}>
                  <button onClick={() => { setForm(fac); setModal("edit"); }} style={{ background:"rgba(var(--primary-rgb),0.1)", color:"var(--primary)", border:"none", padding:"4px 10px", borderRadius:6, fontSize:12, cursor:"pointer" }}>✏️</button>
                  <button onClick={() => deleteFacture(fac.num)} style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444", border:"none", padding:"4px 10px", borderRadius:6, fontSize:12, cursor:"pointer" }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "Nouvelle Facture" : "Modifier Facture"} onClose={() => setModal(null)}>
          <Field label="Client" value={form.client||""} onChange={fld("client")} />
          <Field label="Date émission" value={form.date||""} onChange={fld("date")} type="date" />
          <Field label="Date échéance" value={form.echeance||""} onChange={fld("echeance")} type="date" />
          <Field label="Montant (€)" value={form.montant||""} onChange={fld("montant")} type="number" />
          <Field label="Statut" value={form.statut||""} onChange={fld("statut")} options={["En attente","Payée","En retard"]} />
          <div className="modal-footer">
            <Btn outline onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={saveFacture}>{modal === "new" ? "Créer" : "Enregistrer"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── OPPORTUNITÉS ───────────────────────────────────────────
function OpportunitesPage({ projets, setProjets, factures, setFactures, onLeadGagne }) {
  const [opps, setOpps] = useLocalStorage("opportunites", MOCK_OPPORTUNITES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
  const totalPipeline = opps.reduce((a, o) => a + Number(o.valeur) * o.proba / 100, 0);
  const save = () => {
    const nomFinal = form.nomLibre !== undefined ? form.nomLibre : form.nom;
    const newOpp = { ...form, nom: nomFinal, id: modal === "new" ? Date.now() : form.id };
    if (modal === "new") {
      setOpps(prev => [...prev, newOpp]);
      // Si statut Gagné dès la création → créer projet + facture
      if (newOpp.statut === "Gagné" && onLeadGagne) {
        onLeadGagne({ id: newOpp.id, nom: newOpp.nom, contact: newOpp.contact, valeur: newOpp.valeur, statut: "Gagné", source: "Opportunité" });
      }
    } else {
      const old = opps.find(o => o.id === form.id);
      setOpps(prev => prev.map(o => o.id === form.id ? newOpp : o));
      // Si passage à "Gagné" → créer projet + facture
      if (old?.statut !== "Gagné" && newOpp.statut === "Gagné" && onLeadGagne) {
        onLeadGagne({ id: newOpp.id, nom: newOpp.nom, contact: newOpp.contact, valeur: newOpp.valeur, statut: "Gagné", source: "Opportunité" });
      }
    }
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
            <td className="td-name">
              {o.nom}
              {o.statut === "Gagné" && <span style={{ marginLeft:6, background:"rgba(16,185,129,0.12)", color:"#059669", borderRadius:4, padding:"1px 5px", fontSize:10, fontWeight:700 }}>✅ Projet créé</span>}
            </td>
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
          {/* Sélection Établissement → Entreprise */}
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, fontWeight:600, color:"var(--text-muted)", display:"block", marginBottom:4 }}>Établissement</label>
            <select value={form.etablissementId || ""} onChange={e => { f("etablissementId")(e.target.value); f("etablissementNom")(e.target.options[e.target.selectedIndex]?.text); f("nom")(""); f("contact")(""); f("nomLibre")(undefined); }}
              style={{ width:"100%", padding:"8px 10px", border:"1.5px solid var(--border)", borderRadius:7, fontSize:13, background:"var(--bg)", color:"var(--text)" }}>
              <option value="">— Sélectionner un établissement —</option>
              {MOCK_ETABLISSEMENTS.map(et => <option key={et.id} value={et.id}>{et.nom}</option>)}
            </select>
          </div>
          {form.etablissementId && (
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-muted)", display:"block", marginBottom:4 }}>Entreprise</label>
              <select value={form.nom || ""} onChange={e => {
                  const val = e.target.value;
                  if (val === "__autre__") {
                    f("nom")("");
                    f("nomLibre")("");
                    f("contact")("");
                    f("email")("");
                    f("tel")("");
                  } else {
                    // Trouver l'objet entreprise pour auto-remplir contact/email/tel
                    const entrepriseObj = (ENTREPRISES_PAR_ETAB[form.etablissementId] || []).find(en => en.nom === val);
                    f("nom")(val);
                    f("nomLibre")(undefined);
                    f("contact")(entrepriseObj?.contact || "");
                    f("email")(entrepriseObj?.email || "");
                    f("tel")(entrepriseObj?.tel || "");
                  }
                }}
                style={{ width:"100%", padding:"8px 10px", border:"1.5px solid var(--border)", borderRadius:7, fontSize:13, background:"var(--bg)", color:"var(--text)" }}>
                <option value="">— Sélectionner une entreprise —</option>
                {(ENTREPRISES_PAR_ETAB[form.etablissementId] || []).map(en =>
                  <option key={en.id} value={en.nom} data-contact={en.contact}>{en.nom}</option>
                )}
                <option value="__autre__">+ Autre (saisie libre)</option>
              </select>
            </div>
          )}
          {form.nomLibre !== undefined && (
            <Field label="Nom entreprise (saisie libre)" value={form.nomLibre || ""} onChange={v => f("nomLibre")(v)} />
          )}
          <Field label="Contact" value={form.contact || ""} onChange={f("contact")} />
          <Field label="Email" value={form.email || ""} onChange={f("email")} />
          <Field label="Téléphone" value={form.tel || ""} onChange={f("tel")} />
          <Field label="Valeur estimée (€)" value={form.valeur || ""} onChange={f("valeur")} type="number" />
          <Field label="Statut" value={form.statut || ""} onChange={fld("statut")} options={["Prospection", "Qualification", "Proposition", "Négociation", "Gagné", "Perdu"]} />
          <Field label="Probabilité (%)" value={form.proba || ""} onChange={f("proba")} type="number" />
          <Field label="Échéance" value={form.echeance || ""} onChange={fld("echeance")} type="date" />
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
  const [etabs, setEtabs] = useLocalStorage("etablissements", MOCK_ETABLISSEMENTS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
          <Field label="Statut" value={form.statut || ""} onChange={fld("statut")} options={["Actif", "En cours", "Suspendu", "Résilié"]} />
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
  const [taches, setTaches] = useLocalStorage("taches", MOCK_TACHES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
          <Field label="Statut" value={form.statut || ""} onChange={fld("statut")} options={["À faire", "En cours", "Terminé"]} />
          <Field label="Assigné à" value={form.assigne || ""} onChange={f("assigne")} />
          <Field label="Échéance" value={form.echeance || ""} onChange={fld("echeance")} type="date" />
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
function ComptabilitePage({ factures: propFactures, setFactures: propSetFactures }) {
  const [comptes] = useState(MOCK_COMPTES);
  const [compteActif, setCompteActif] = useState(1);
  const [_factures, _setFactures] = useLocalStorage("factures", MOCK_FACTURES);
  const factures    = propFactures    !== undefined ? propFactures    : _factures;
  const setFactures = propSetFactures !== undefined ? propSetFactures : _setFactures;
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
          <Field label="Client" value={form.client || ""} onChange={fld("client")} />
          <Field label="Montant (€)" value={form.montant || ""} onChange={fld("montant")} type="number" />
          <Field label="Statut" value={form.statut || ""} onChange={fld("statut")} options={["En attente", "Payée", "En retard"]} />
          <Field label="Échéance" value={form.echeance || ""} onChange={fld("echeance")} type="date" />
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
  const [effectifs, setEffectifs] = useLocalStorage("effectifs", MOCK_EFFECTIFS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
  const [cands, setCands] = useLocalStorage("candidatures", MOCK_CANDIDATURES);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
          <Field label="Statut" value={form.statut || ""} onChange={fld("statut")} options={["CV reçu", "Entretien planifié", "Accepté", "Refusé"]} />
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
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
          <Field label="Statut" value={form.statut || ""} onChange={fld("statut")} options={["Ouvert", "En cours", "Résolu"]} />
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
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
          <Field label="Date" value={form.date || ""} onChange={fld("date")} type="date" />
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
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
  const [profil, setProfil] = useLocalStorage("profil", { ...MOCK_PROFIL, ...user });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profil);
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fld = k => v => setForm(p => ({ ...p, [k]: v }));
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
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>⚠️ Zone dangereuse</div>
          <Btn danger small onClick={() => {
            if (window.confirm("Réinitialiser toutes les données? (Retour aux données demo)")) {
              ["projets","users","effectifs","candidatures","taches","factures","opportunites","etablissements"].forEach(k => localStorage.removeItem("prevhub_" + k));
              window.location.reload();
            }
          }}>🔄 Réinitialiser les données demo</Btn>
        </div>
        <div style={{ marginTop: 12 }}>
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
  { id: "dashboard",    label: "Dashboard",            icon: "📊", color: "#e85d26" },
  { id: "projets",      label: "Projets",              icon: "📁", color: "#3b82f6" },
  { id: "crm",          label: "CRM",                  icon: "🎯", color: "#8b5cf6" },
  { id: "suivi",        label: "Suivi établissement",  icon: "🏢", color: "#06b6d4" },
  { id: "emails",       label: "Emails",               icon: "✉️", color: "#6366f1" },
  { id: "opportunites", label: "Opportunités",          icon: "💡", color: "#f59e0b" },
  { id: "candidatures", label: "Candidatures",          icon: "📝", color: "#10b981" },
  { id: "support",      label: "Support",              icon: "🎧", color: "#ef4444" },
  { id: "validations",  label: "Validations",          icon: "✅", color: "#22c55e" },
];
const NAV2 = [
  { id: "taches",       label: "Gestionnaire de Tâches", icon: "☑️", color: "#3b82f6" },
  { id: "comptabilite", label: "Comptabilité",            icon: "🧾", color: "#10b981" },
  { id: "independants", label: "Indépendants",            icon: "🧑‍💼", color: "#8b5cf6" },
  { id: "effectifs",    label: "Effectifs",               icon: "👔", color: "#06b6d4" },
  { id: "autorisations",label: "Autorisations",           icon: "🔐", color: "#f59e0b" },
  { id: "sms",          label: "SMS/WhatsApp",            icon: "💬", color: "#22c55e" },
  { id: "parametres",   label: "Paramètres",              icon: "⚙️", color: "#64748b" },
  { id: "campagnes",    label: "Campagnes Drip",          icon: "📧", color: "#6366f1" },
];
const NAV3 = [
  { id: "attribution",  label: "Attribution Leads",       icon: "🎯", color: "#e85d26" },
  { id: "analytics",    label: "Analytics",               icon: "📈", color: "#3b82f6" },
  { id: "formulaires",  label: "Formulaires Web",         icon: "📋", color: "#8b5cf6" },
  { id: "webhooks",     label: "Webhooks & Intégrations", icon: "🔗", color: "#06b6d4" },
  { id: "ressources",   label: "Ressources",              icon: "📚", color: "#f59e0b" },
];
const ALL_NAV = [...NAV1, ...NAV2, ...NAV3];

// ══════════════════════════════════════════════════════════════
//  APP ROOT
// ══════════════════════════════════════════════════════════════

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(() => localStorage.getItem("prevhub_dark") === "true");
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showIA, setShowIA] = useState(false);

  // ── SHARED STATE — données liées entre Pipeline / Projets / Comptabilité ──
  const [sharedLeads,   setSharedLeads]   = useLocalStorage("crm_leads",   []);
  const [sharedProjets, setSharedProjets] = useLocalStorage("projets",     MOCK_PROJETS);
  const [sharedFactures,setSharedFactures]= useLocalStorage("factures",    MOCK_FACTURES);

  // Quand un lead passe à "Gagné" → crée automatiquement un Projet + une Facture
  const handleLeadGagne = (lead) => {
    // ── 1. Ajouter dans CRM Pipeline comme lead "Gagné" ──
    const newLead = {
      id: lead.id,
      nom: lead.nom,
      contact: lead.contact || "—",
      email: lead.email || "—",
      tel: lead.tel || "—",
      valeur: Number(lead.valeur) || 0,
      statut: "Gagné",
      source: lead.source || "Opportunité",
      date: new Date().toISOString().slice(0,10),
      origine: "opportunite",
    };
    setSharedLeads(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      if (arr.find(l => l.id === lead.id)) {
        // Si existe déjà → update statut à Gagné
        return arr.map(l => l.id === lead.id ? {...l, statut:"Gagné"} : l);
      }
      return [newLead, ...arr];
    });

    // ── 2. Créer le projet ──
    const newProjet = {
      id: lead.id + 9000,
      nom: lead.nom,
      client: lead.nom,
      contact: lead.contact,
      email: lead.email,
      tel: lead.tel,
      statut: "Devis accepté",
      montant: Number(lead.valeur) || 0,
      date: new Date().toISOString().slice(0,10),
      resp: lead.source || "—",
      origine: "pipeline",
      leadId: lead.id,
    };
    setSharedProjets(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      if (arr.find(p => p.leadId === lead.id)) return arr;
      return [newProjet, ...arr];
    });
    // Créer la facture
    const newFacture = {
      id: "FAC-AUTO-" + lead.id,
      client: lead.nom,
      montant: Number(lead.valeur) || 0,
      statut: "En attente",
      date: new Date().toISOString().slice(0,10),
      echeance: new Date(Date.now() + 30*24*60*60*1000).toISOString().slice(0,10),
      compte: 1,
      origine: "pipeline",
      leadId: lead.id,
    };
    setSharedFactures(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      if (arr.find(f => f.leadId === lead.id)) return arr;
      return [newFacture, ...arr];
    });
    // Notif
    setNotifs(prev => [{
      id: Date.now(),
      texte: "🏆 " + lead.nom + " converti en client — Projet et facture créés automatiquement",
      type: "success",
      date: new Date().toLocaleString("fr-FR"),
      lu: false,
    }, ...prev]);
  };

  // ── Suppression en cascade: Projet → Lead Pipeline + Facture + Opportunité ──
  const handleDeleteProjet = (projet) => {
    // 1. Supprimer projet
    setSharedProjets(prev => prev.filter(p => p.id !== projet.id));
    // 2. Supprimer facture liée
    setSharedFactures(prev => prev.filter(f => f.leadId !== projet.leadId && f.id !== "FAC-AUTO-" + projet.leadId));
    // 3. Retirer le lead du pipeline (ou reset statut)
    setSharedLeads(prev => prev.filter(l => l.id !== projet.leadId));
    // 4. Notif
    setNotifs(prev => [{
      id: Date.now(),
      texte: "🗑️ Projet " + projet.nom + " supprimé — pipeline et facture nettoyés",
      type: "warning",
      date: new Date().toLocaleString("fr-FR"),
      lu: false,
    }, ...prev]);
  };

  // Applique dark mode sur <body> — c'est ici que ça marche!
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("prevhub_dark", dark);
  }, [dark]);

  const unreadNotifs = notifs.filter(n => !n.lu).length;

  const handleLogin = (u) => { setUser(u); setPage("dashboard"); };
  const handleLogout = () => { setUser(null); setPage("dashboard"); };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <Dashboard setPage={setPage} />;
      case "projets":      return <ProjetsPage projets={sharedProjets} setProjets={setSharedProjets} factures={sharedFactures} setFactures={setSharedFactures} onDeleteProjet={handleDeleteProjet} />;
      case "utilisateurs": return <UtilisateursPage />;
      case "crm":          return <CRMPage leads={sharedLeads} setLeads={setSharedLeads} projets={sharedProjets} setProjets={setSharedProjets} factures={sharedFactures} setFactures={setSharedFactures} onLeadGagne={handleLeadGagne} />;
      case "opportunites": return <OpportunitesPage projets={sharedProjets} setProjets={setSharedProjets} factures={sharedFactures} setFactures={setSharedFactures} onLeadGagne={handleLeadGagne} />;
      case "suivi":        return <SuiviPage />;
      case "taches":       return <TachesPage />;
      case "comptabilite": return <ComptabilitePage factures={sharedFactures} setFactures={setSharedFactures} />;
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
      {items.map(n => {
        const isActive = page === n.id;
        return (
          <button
            key={n.id}
            className={`nav-btn ${isActive ? "active" : ""}`}
            onClick={() => setPage(n.id)}
            style={isActive ? {
              background: n.color,
              color: "#fff",
              boxShadow: `0 4px 14px ${n.color}55`,
              borderColor: "transparent",
            } : {
              "--nav-hover-color": n.color,
            }}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = n.color + "22"; e.currentTarget.style.color = n.color; e.currentTarget.style.borderColor = n.color + "44"; }}}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; }}}
          >
            <span>{n.icon}</span>{n.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div onClick={() => setShowNotifs(false)}>
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
          <button className="icon-btn" title="Assistant IA"
            onClick={() => setShowIA(s => !s)}
            style={{ position: "relative", background: showIA ? "var(--primary)" : "", color: showIA ? "#fff" : "" }}>
            🤖
            <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#4ade80", border: "2px solid var(--bg-nav)" }} />
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

      {/* ── IA Assistant ── */}
      {showIA && <IAAssistant onClose={() => setShowIA(false)} />}
      {!showIA && (
        <button className="ia-bubble" onClick={() => setShowIA(true)}>
          🤖
          <span className="ia-bubble-badge">IA</span>
        </button>
      )}
    </div>
  );
}