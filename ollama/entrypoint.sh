#!/bin/bash
set -e

# Démarrer Ollama en arrière-plan
ollama serve &
SERVER_PID=$!

# Attendre que le serveur soit prêt
sleep 5

# Pull des modèles (seulement si pas déjà présents)
ollama list | grep -q "llama3.2:3b" || ollama pull llama3.2:3b
ollama list | grep -q "llama3.2:1b" || ollama pull llama3.2:1b
ollama list | grep -q "llama3.2:1b" || ollama pull phi3:mini

# Attendre le processus principal
wait $SERVER_PID