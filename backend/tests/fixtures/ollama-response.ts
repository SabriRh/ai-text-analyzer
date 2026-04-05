export const mockOllamaSuccessResponse = {
    choices: [
        {
            message: {
                content: JSON.stringify({
                    detectedLanguage: 'français',
                    corrections: ['Correction 1', 'Correction 2'],
                    reformulated: 'Version reformulée du texte.',
                    optimized: 'Version optimisée.',
                    summary: 'Résumé du texte.',
                    key_points: ['Point 1', 'Point 2', 'Point 3'],
                    sentiment: 'positif',
                    score: 0.85
                })
            }
        }
    ]
}

export const mockOllamaErrorResponse = {
    error: {
        message: 'Model not found',
        type: 'invalid_request_error'
    }
}

export const validText = 'Ceci est un texte valide à analyser.'

export const invalidTexts = {
    empty: '',
    whitespace: '   ',
    tooLong: 'a'.repeat(2000)
}