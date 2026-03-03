// src/api.js — Service API Prev'Hub
// ══════════════════════════════════════════════════════

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ── Helper fetch ──────────────────────────────────────
async function request(method, path, body = null) {
  const token = localStorage.getItem("prevhub_token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Erreur API");
  return data;
}

const get    = (path)        => request("GET",    path);
const post   = (path, body)  => request("POST",   path, body);
const put    = (path, body)  => request("PUT",    path, body);
const patch  = (path, body)  => request("PATCH",  path, body);
const del    = (path)        => request("DELETE", path);

// ══════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════
export const auth = {
  login:    (email, password) => post("/api/auth/login", { email, password }),
  me:       ()                => get("/api/auth/me"),
  register: (data)            => post("/api/auth/register", data),
};

// ══════════════════════════════════════════════════════
//  PROJETS
// ══════════════════════════════════════════════════════
export const projetsAPI = {
  getAll:  ()         => get("/api/projets"),
  create:  (data)     => post("/api/projets", data),
  update:  (id, data) => put(`/api/projets/${id}`, data),
  delete:  (id)       => del(`/api/projets/${id}`),
};

// ══════════════════════════════════════════════════════
//  LEADS / CRM
// ══════════════════════════════════════════════════════
export const leadsAPI = {
  getAll:  ()         => get("/api/leads"),
  create:  (data)     => post("/api/leads", data),
  update:  (id, data) => put(`/api/leads/${id}`, data),
  delete:  (id)       => del(`/api/leads/${id}`),
};

// ══════════════════════════════════════════════════════
//  FACTURES
// ══════════════════════════════════════════════════════
export const facturesAPI = {
  getAll:  ()     => get("/api/factures"),
  create:  (data) => post("/api/factures", data),
  update:  (id, data) => put(`/api/factures/${id}`, data),
  payer:   (id)   => patch(`/api/factures/${id}/payer`),
  delete:  (id)   => del(`/api/factures/${id}`),
};

// ══════════════════════════════════════════════════════
//  UTILISATEURS
// ══════════════════════════════════════════════════════
export const usersAPI = {
  getAll:  ()         => get("/api/utilisateurs"),
  create:  (data)     => post("/api/utilisateurs", data),
  update:  (id, data) => put(`/api/utilisateurs/${id}`, data),
  delete:  (id)       => del(`/api/utilisateurs/${id}`),
};

// ══════════════════════════════════════════════════════
//  TACHES
// ══════════════════════════════════════════════════════
export const tachesAPI = {
  getAll:  ()         => get("/api/taches"),
  create:  (data)     => post("/api/taches", data),
  update:  (id, data) => put(`/api/taches/${id}`, data),
  delete:  (id)       => del(`/api/taches/${id}`),
};