// components/dashboard/ai-assistant.tsx
"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

export function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour Khalid ! Je suis votre Assistant KESSEF. Comment puis-je vous aider à finaliser votre plan d'affaires aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulation de réponse IA (remplacez par vrai appel API plus tard)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "D'après les données de votre projet Menuiserie CNC à Tanger, la subvention CRI atteint 72 000 MAD. Voulez-vous que je recalcule le ROI avec un investissement de 420 000 MAD ?"
      }]);
    }, 1200);
  };

  return (
    <div className="rounded-3xl border bg-card flex flex-col h-[520px]">
      <div className="border-b px-6 py-4 flex items-center gap-3">
        <Bot className="h-5 w-5 text-emerald-500" />
        <div>
          <div className="font-semibold">Assistant IA KESSEF</div>
          <div className="text-xs text-emerald-500">En ligne • Spécialisé Pacte National</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ex: Quel est le délai de remboursement pour mon projet ?"
            className="flex-1 rounded-2xl border bg-background px-5 py-3 text-sm focus:outline-none focus:border-primary"
          />
          <button
            onClick={sendMessage}
            className="rounded-2xl bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="text-center text-[10px] text-muted-foreground mt-3">
          L'assistant IA est optimisé pour les projets Intelaka / Start TPE
        </div>
      </div>
    </div>
  );
}