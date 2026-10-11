import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { initLanguageService } from './services/language.service.js';

const port = env.PORT;

async function start() {
  await initLanguageService();
  logger.info('Language detection model loaded');

  app.listen(port, () => {
    logger.info({ port, nodeEnv: env.NODE_ENV }, 'Server started');
  });
}

start().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});