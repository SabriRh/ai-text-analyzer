# AI Text Analyzer

A small POC to analyze text with a local LLM: corrections, reformulation,
summary, key points, and sentiment. Built with Ollama, Express, and Angular.

## Stack

- **Backend**: Node.js 20+, Express 5, TypeScript (ESM)
- **Frontend**: Angular 21, Angular Material
- **AI**: Ollama (default model: `llama3.2:1b`)
- **Validation**: Zod
- **Container**: Docker Compose

## Prerequisites

- Node.js ≥ 20.19
- npm ≥ 10
- [Ollama](https://ollama.com) running locally (or via Docker Compose)

## Quick start (Docker)

```bash
git clone https://github.com/SabriRh/ai-text-analyzer.git
cd ai-text-analyzer
docker compose up -d
```

Frontend: http://localhost
Backend: http://localhost:3000
Ollama: http://localhost:11434

## Manual setup

### 1. Start Ollama and pull the model
ollama serve
ollama pull llama3.2:1b

### 2. Install dependencies (npm workspaces — one install at root)
npm install

### 3. Configure environment
cp backend/.env.example backend/.env

### 4. Run backend + frontend
npm run dev

Frontend runs on http://localhost:4200
backend runs on http://localhost:3000.

## Scripts

```bash
npm run dev	Run backend + frontend
npm run dev:backend	Backend only
npm run dev:frontend	Frontend only
npm run build	Build both
```
## License

ISC
