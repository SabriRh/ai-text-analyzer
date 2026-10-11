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

Prerequisite: Docker with Compose v2.24+. Nothing else to install.

```bash
git clone https://github.com/SabriRh/ai-text-analyzer.git
cd ai-text-analyzer
docker compose up -d --build
```

The first start downloads the model (`llama3.2:1b`, about 1.3 GB) into the
`ollama_data` volume, so the backend is only available once the download is
done. Follow it with `docker compose logs -f ollama-init`.

| Service  | URL                    |
| -------- | ---------------------- |
| Frontend | http://localhost       |
| Backend  | http://localhost:3000  |
| Ollama   | http://localhost:11435 |

The frontend reaches the backend through the nginx `/api` proxy, so the app
works the same from another machine on the network.

### Configuration

Copy `.env.example` to `.env` to change the model or the host ports
(`FRONTEND_PORT`, `BACKEND_PORT`, `OLLAMA_PORT`, `DEFAULT_MODEL`).

### Use the Ollama installed on the host

Ollama in Docker runs on CPU only (no Metal/GPU on macOS), which is slow. To
use a native Ollama instead (it must be running with the model pulled):

```bash
docker compose -f docker-compose.yml -f docker-compose.host-ollama.yml up -d --build
```

### Troubleshooting

- Port already in use: set another value in `.env` (for example `FRONTEND_PORT=8080`).
- Health check: `curl http://localhost:3000/health`.
- Reset everything, including the downloaded model: `docker compose down -v`.

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
