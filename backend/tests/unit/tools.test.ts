import { languageDetection } from '../../src/shared/tools'

describe('languageDetection - Unitaire', () => {

    describe('Cas normal - texte suffisamment long (>20 caractères)', () => {

        it('devrait détecter le français (French)', () => {
            const text = 'Bonjour le monde, comment allez-vous aujourd\'hui ?'
            const result = languageDetection(text)
            expect(result).toBe('French')
        })

        it('devrait détecter l\'anglais (English)', () => {
            const text = 'Hello world, how are you doing today?'
            const result = languageDetection(text)
            expect(result).toBe('English')
        })
    })

    describe('Cas particulier - texte trop court (<20 caractères)', () => {

        it('devrait retourner "unknown language to detect" pour un texte court', () => {
            const text = 'Bonjour'
            const result = languageDetection(text)
            expect(result).toBe('unknown language to detect')
        })

        it('devrait retourner "unknown language to detect" pour un texte vide', () => {
            const result = languageDetection('')
            expect(result).toBe('unknown language to detect')
        })

        it('devrait retourner "unknown language to detect" pour "hello" (5 caractères)', () => {
            const result = languageDetection('hello')
            expect(result).toBe('unknown language to detect')
        })
    })

    describe('Cas où franc peut se tromper sur les textes courts', () => {

        it('devrait retourner "unknown language to detect" pour un texte de 15 caractères', () => {
            // Même si franc détecte quelque chose, ta fonction retourne unknown car <20
            const result = languageDetection('This is a test')
            expect(result).toBe('unknown language to detect')
        })
    })
})