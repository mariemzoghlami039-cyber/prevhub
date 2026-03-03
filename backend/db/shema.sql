-- ══════════════════════════════════════════════════════
--  PREV'HUB — Schema PostgreSQL (Neon)
--  Copiez ce fichier dans votre Neon SQL Editor
-- ══════════════════════════════════════════════════════

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── UTILISATEURS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS utilisateurs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom         VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(50) DEFAULT 'Consultant',
  actif       BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── PROJETS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projets (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom         VARCHAR(150) NOT NULL,
  client      VARCHAR(150) NOT NULL,
  statut      VARCHAR(80) DEFAULT 'En brouillon',
  montant     NUMERIC(12,2) DEFAULT 0,
  responsable VARCHAR(100),
  date_projet DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── LEADS / CRM ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom         VARCHAR(150) NOT NULL,
  contact     VARCHAR(100),
  email       VARCHAR(150),
  source      VARCHAR(80) DEFAULT 'Site web',
  statut      VARCHAR(50) DEFAULT 'Nouveau',
  date_lead   DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── FACTURES ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS factures (
  id          VARCHAR(30) PRIMARY KEY,
  client      VARCHAR(150) NOT NULL,
  montant     NUMERIC(12,2) DEFAULT 0,
  statut      VARCHAR(50) DEFAULT 'En attente',
  date_facture DATE DEFAULT CURRENT_DATE,
  echeance    DATE,
  compte_id   INTEGER DEFAULT 1,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── TACHES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS taches (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titre       VARCHAR(200) NOT NULL,
  projet      VARCHAR(150),
  priorite    VARCHAR(20) DEFAULT 'Normale',
  statut      VARCHAR(30) DEFAULT 'À faire',
  echeance    DATE,
  assigne     VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── CANDIDATURES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidatures (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poste       VARCHAR(150) NOT NULL,
  candidat    VARCHAR(100) NOT NULL,
  email       VARCHAR(150),
  statut      VARCHAR(50) DEFAULT 'CV reçu',
  date_cand   DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── EFFECTIFS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS effectifs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom          VARCHAR(100) NOT NULL,
  poste        VARCHAR(100),
  departement  VARCHAR(80),
  salaire      NUMERIC(10,2) DEFAULT 0,
  contrat      VARCHAR(30) DEFAULT 'CDI',
  date_entree  DATE,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ── OPPORTUNITES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS opportunites (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom         VARCHAR(150) NOT NULL,
  contact     VARCHAR(100),
  valeur      NUMERIC(12,2) DEFAULT 0,
  statut      VARCHAR(50) DEFAULT 'Prospection',
  probabilite INTEGER DEFAULT 20,
  echeance    DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── ETABLISSEMENTS ────────────────────────────────────
CREATE TABLE IF NOT EXISTS etablissements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom         VARCHAR(150) NOT NULL,
  secteur     VARCHAR(80),
  effectif    INTEGER DEFAULT 0,
  contrat     VARCHAR(100),
  statut      VARCHAR(50) DEFAULT 'En cours',
  date_debut  DATE,
  responsable VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── DONNEES DE TEST ───────────────────────────────────
-- Mot de passe: admin123 (bcrypt hash)
INSERT INTO utilisateurs (nom, email, password, role) VALUES
  ('Marie Zoghlami', 'admin@preveris.pro', '$2b$10$X9vOs5A1DJRH.AoZBvFnNuarGDCM.QFKN5mT8sZ7E/FPxXk7kGcCi', 'Administrateur'),
  ('Karim Benzara',  'karim@preveris.pro', '$2b$10$X9vOs5A1DJRH.AoZBvFnNuarGDCM.QFKN5mT8sZ7E/FPxXk7kGcCi', 'Chargé d''affaires'),
  ('Amira Touati',   'amira@preveris.pro', '$2b$10$X9vOs5A1DJRH.AoZBvFnNuarGDCM.QFKN5mT8sZ7E/FPxXk7kGcCi', 'Consultant')
ON CONFLICT (email) DO NOTHING;

INSERT INTO projets (nom, client, statut, montant, responsable) VALUES
  ('POLY91',              'POLY91',              'Devis accepté',              12400, 'Karim B.'),
  ('SAS IKAI',            'SAS IKAI',            'Réalisation pièces écrites', 8750,  'Amira T.'),
  ('France Terre d''Asile','France Terre d''Asile','Devis accepté',            15200, 'Nadia K.'),
  ('Mairie de Lyon',      'Mairie de Lyon',      'En cours',                   9500,  'Omar S.')
ON CONFLICT DO NOTHING;

INSERT INTO leads (nom, contact, email, source, statut) VALUES
  ('Entreprise Alpha', 'M. Dupont',  'dupont@alpha.fr',  'Site web',  'Nouveau'),
  ('Groupe Beta',      'Mme Martin', 'martin@beta.fr',   'Référence', 'Contacté'),
  ('PME Gamma',        'M. Leroy',   'leroy@gamma.fr',   'LinkedIn',  'Qualifié')
ON CONFLICT DO NOTHING;
