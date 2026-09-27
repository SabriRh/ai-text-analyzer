import express from 'express';
import cors from 'cors';
import analyzeRoute from './routes/analyze.route.js';
import healthRoute from './routes/health.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

// Body parser
app.use(express.json({ limit: '100kb' }));

// CORS
app.use(
    cors({
        origin: ['http://localhost', 'http://localhost:80', 'http://localhost:4200'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// Routes
app.get('/', (_req, res) => {
    res.send({ message: 'Hello World!' });
});
app.use('/analyze', analyzeRoute);
app.use('/health', healthRoute);

// Errors handler
app.use(errorHandler);

export default app;