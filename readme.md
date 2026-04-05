# 🧠 AI Text Analyzer

Analyse, corrige, reformule et résume n'importe quel texte avec une IA locale (Ollama).

## ⚡ Stack

| Côté     | Techno                         |
| -------- | ------------------------------ |
| Frontend | Angular 18 + SCSS              |
| Backend  | Node.js + Express + TypeScript |
| IA       | Ollama (llama3.2:1b)           |
| Tests    | Jest + Supertest               |

## 🚀 Installation

```bash
git clone https://github.com/ton-user/text-analyzer
cd text-analyzer

# Backend
cd backend
npm install
npm run dev

# Frontend (autre terminal)
cd frontend
npm install
ng serve
```

Prérequis : Node.js 20+, Ollama installé

ollama pull llama3.2:1b

text-analyzer/
├── backend/
│ ├── src/
│ │ ├── controllers/ # Logique métier
│ │ ├── routes/ # Endpoints
│ │ ├── models/ # Types TS
│ │ └── server.ts
│ ├── tests/
│ │ ├── unit/ # Tests isolés
│ │ └── integration/ # Tests API
│ └── package.json
├── frontend/ # Angular
└── README.md

🎯 Fonctionnalités

✍️ Correction grammaticale
🔄 Reformulation
⚡ Version optimisée (courte)
📄 Résumé automatique
🎯 Extraction des points clés
😊 Analyse de sentiment
📊 Score de qualité (0-1)
🌍 Détection de langue
📝 API

Endpoint Méthode Description
/analyze POST Analyse un texte
/health GET Statut du serveur et d'Ollama
📄 Licence

MIT
