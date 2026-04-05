import { Request, Response } from 'express'
import { checkOllamaHealth } from '../shared/tools'

export async function getHealth(req: Request, res: Response) {
    const ollamaHealth = await checkOllamaHealth()

    const globalStatus = ollamaHealth.available ? 'ok' : 'ko'

    res.status(200).json({
        status: globalStatus,
        timestamp: new Date().toISOString(),
        services: {
            ollama: ollamaHealth
        }
    })
}