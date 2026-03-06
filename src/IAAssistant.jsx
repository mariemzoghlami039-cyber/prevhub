// ══════════════════════════════════════════════════════════════
//  IAAssistant.jsx — Chatbot IA intégré à Prev'Hub
//  Powered by Claude (Anthropic)
// ══════════════════════════════════════════════════════════════
import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Tu es l'assistant IA de Prev'Hub, la plateforme de gestion pour PREVERIS, une société spécialisée en prévoyance collective et prévention incendie en France.

Tu aides les utilisateurs à :
- Comprendre la réglementation prévoyance collective (CCN, BSPCE, contrats de prévoyance)
- Analyser leurs projets et proposer des étapes suivantes
- Rédiger des synthèses et rapports de projet
- Conseiller sur les meilleures pratiques en prévention incendie
- Répondre aux questions sur la gestion des établissements clients

Contexte de l'application:
- Prev'Hub gère des projets de prévoyance pour des entreprises clientes
- Les statuts de projet: Opportunité → En attente signature → Dossier envoyé → Réalisation → Terminé
- Les modules: Projets, CRM, Comptabilité, Effectifs, Candidatures, Support

Réponds toujours en français, de manière professionnelle mais accessible.
Sois concis (max 3-4 paragraphes) sauf si on te demande un rapport détaillé.
Tu peux utiliser des emojis professionnels pour structurer tes réponses.`;

const SUGGESTIONS = [
  "📋 Génère une synthèse de projet",
  "📜 Explique la réglementation prévoyance",
  "🎯 Quelle est la prochaine étape?",
  "💡 Conseils pour convaincre un client",
  "🔥 Règles prévention incendie ERP",
  "📊 Comment calculer une cotisation?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "var(--primary)", opacity: 0.7,
          animation: `typingBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
      gap: 8,
      alignItems: "flex-end",
    }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary), #ff8c5a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: "78%",
        background: isUser
          ? "linear-gradient(135deg, var(--primary), #ff6b35)"
          : "var(--bg-card)",
        color: isUser ? "#fff" : "var(--text-primary)",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        padding: "10px 14px",
        fontSize: 13.5,
        lineHeight: 1.6,
        border: isUser ? "none" : "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        whiteSpace: "pre-wrap",
      }}>
        {msg.typing ? <TypingDots /> : msg.content}
      </div>
      {isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "var(--border)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: "var(--text-secondary)",
          flexShrink: 0,
        }}>M</div>
      )}
    </div>
  );
}

export default function IAAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour! 👋 Je suis votre assistant IA Prev'Hub.\n\nJe peux vous aider avec:\n• 📋 Synthèses et rapports de projets\n• 📜 Réglementation prévoyance collective\n• 🔥 Prévention incendie\n• 💡 Conseils clients et stratégie\n\nComment puis-je vous aider aujourd'hui?",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    const userMsg = { role: "user", content: userText };
    const typingMsg = { role: "assistant", content: "", typing: true };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => !m.typing)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: userText }],
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Désolé, je n'ai pas pu générer une réponse.";

      setMessages(prev => [
        ...prev.filter(m => !m.typing),
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev.filter(m => !m.typing),
        { role: "assistant", content: "❌ Erreur de connexion. Vérifiez votre connexion internet." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: "Chat réinitialisé. Comment puis-je vous aider? 😊",
    }]);
  };

  if (isMinimized) {
    return (
      <button className="ia-bubble" onClick={() => setIsMinimized(false)}>
        🤖
        <span className="ia-bubble-badge">IA</span>
      </button>
    );
  }

  return (
    <div className="ia-panel">
      {/* Header */}
      <div className="ia-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="ia-avatar">🤖</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>Assistant IA</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              En ligne · Prev'Hub AI
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="ia-header-btn" onClick={clearChat} title="Nouveau chat">🗑️</button>
          <button className="ia-header-btn" onClick={() => setIsMinimized(true)} title="Réduire">－</button>
          <button className="ia-header-btn" onClick={onClose} title="Fermer">✕</button>
        </div>
      </div>

      {/* Messages */}
      <div className="ia-messages">
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="ia-suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="ia-suggestion-btn" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="ia-input-bar">
        <input
          ref={inputRef}
          className="ia-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Posez votre question..."
          disabled={loading}
        />
        <button
          className="ia-send-btn"
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
        >
          {loading ? "⏳" : "➤"}
        </button>
      </div>
    </div>
  );
}