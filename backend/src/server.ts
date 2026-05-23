import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'
import analyzeRoute from './routes/analyze.route';
import healthRoute from './routes/health.route';

dotenv.config()
const port = process.env.PORT;
export const app = express();


app.use(express.json());
app.use(cors({
  origin: ['http://localhost', 'http://localhost:80', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))


// Routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});
app.use('/analyze', analyzeRoute);
app.use('/health', healthRoute)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}