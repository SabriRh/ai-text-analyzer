import request from 'supertest'
import { app } from '../../src/server'

// ============================================
// MOCKS
// ============================================

// Mock du service Ollama pour le health check
jest.mock('../../src/shared/tools', () => ({
    checkOllamaHealth: jest.fn().mockResolvedValue({
        available: true,
        latencyMs: 100,
        models: ['llama3.2:1b', 'llama3.2:latest']
    }),
    languageDetection: jest.fn().mockReturnValue('français'),
    buildAnalyzePrompt: jest.fn().mockReturnValue('mock prompt')
}))

// Mock d'OpenAI (Ollama) pour POST /analyze
jest.mock('openai', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    corrections: ['Correction exemple'],
                                    reformulated: 'Version reformulée du texte.',
                                    optimized: 'Version optimisée.',
                                    summary: 'Résumé du texte.',
                                    key_points: ['Point 1', 'Point 2'],
                                    sentiment: 'positif',
                                    score: 0.85
                                })
                            }
                        }
                    ]
                })
            }
        }
    }))
}))

// ============================================
// TESTS HEALTH CHECK
// ============================================

describe('GET /health', () => {

    it('doit retourner 200', async () => {
        const response = await request(app).get('/health')
        expect(response.status).toBe(200)
    })

    it('doit retourner le status "ok"', async () => {
        const response = await request(app).get('/health')
        expect(response.body.status).toBe('ok')
    })

    it('doit retourner un timestamp', async () => {
        const response = await request(app).get('/health')
        expect(response.body).toHaveProperty('timestamp')
    })

    it('doit retourner les services', async () => {
        const response = await request(app).get('/health')
        expect(response.body).toHaveProperty('services')
        expect(response.body.services).toHaveProperty('ollama')
    })

    it('doit retourner les infos Ollama', async () => {
        const response = await request(app).get('/health')
        expect(response.body.services.ollama.available).toBe(true)
        expect(response.body.services.ollama.latencyMs).toBeDefined()
        expect(response.body.services.ollama.models).toBeInstanceOf(Array)
    })
})

// ============================================
// TESTS POST /analyze
// ============================================

describe('POST /analyze', () => {

    describe('Cas de succès', () => {

        it('doit retourner 200 pour un texte valide', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Je sui allé a la maison.' })

            expect(response.status).toBe(200)
        })

        it('doit retourner la structure complète de l\'analyse', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Test' })

            expect(response.body).toHaveProperty('corrections')
            expect(response.body).toHaveProperty('reformulated')
            expect(response.body).toHaveProperty('optimized')
            expect(response.body).toHaveProperty('summary')
            expect(response.body).toHaveProperty('key_points')
            expect(response.body).toHaveProperty('sentiment')
            expect(response.body).toHaveProperty('score')
            expect(response.body).toHaveProperty('language')
        })

        it('doit retourner les corrections dans un tableau', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Texte avec erreurs' })

            expect(Array.isArray(response.body.corrections)).toBe(true)
        })

        it('doit retourner un score entre 0 et 1', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Bonjour monde' })

            expect(response.body.score).toBeGreaterThanOrEqual(0)
            expect(response.body.score).toBeLessThanOrEqual(1)
        })

        it('doit retourner un sentiment valide', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Je suis très content' })

            const validSentiments = ['positif', 'negatif', 'neutre']
            expect(validSentiments).toContain(response.body.sentiment)
        })

        it('doit retourner la langue détectée', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Bonjour monde' })

            expect(response.body.language).toBeDefined()
        })
    })

    describe('Validation - Content-Type', () => {

        it('doit retourner 400 si Content-Type n\'est pas JSON', async () => {
            const response = await request(app)
                .post('/analyze')
                .set('Content-Type', 'text/plain')
                .send('text brut')

            expect(response.status).toBe(400)
            expect(response.body.error).toContain('Content-Type')
        })
    })

    describe('Validation - Texte manquant ou invalide', () => {

        it('doit retourner 400 si le texte est manquant', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({})

            expect(response.status).toBe(400)
            expect(response.body.error).toBeDefined()
        })

        it('doit retourner 400 si le texte est vide', async () => {
            const response = await request(app)
                .post('/analyze')
                .send({ text: '' })

            expect(response.status).toBe(400)
            expect(response.body.error).toBeDefined()
        })
    })

    describe('Gestion des erreurs Ollama', () => {

        it('doit retourner 500 si Ollama échoue', async () => {
            // Surcharger le mock pour faire échouer
            const { default: OpenAIMock } = require('openai')
            OpenAIMock.mockImplementationOnce(() => ({
                chat: {
                    completions: {
                        create: jest.fn().mockRejectedValue(new Error('Ollama connection failed'))
                    }
                }
            }))

            const response = await request(app)
                .post('/analyze')
                .send({ text: 'Test' })

            expect(response.status).toBe(500)
            expect(response.body.error).toBeDefined()
        })
    })
})