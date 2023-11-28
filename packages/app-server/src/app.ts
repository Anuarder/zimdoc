import path from 'path';
import fastify from 'fastify';

import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { serveStatic } from './plugins/serve-static';
import { config } from './config';
import { ping } from './routes/ping';
import { userRoutes } from './routes/user';
import { documentRoutes } from './routes/document';

const root = path.join(__dirname, '..');

const PORT = config.get('port');
const APP_HOST = config.get('app_host');
const SERVER_API_PREFIX = config.get('server_api_prefix');

async function setupServer() {
  const app = fastify({
    logger: true,
    disableRequestLogging: true,
    requestIdHeader: false,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(ping, { prefix: SERVER_API_PREFIX });
  app.register(userRoutes, { prefix: SERVER_API_PREFIX });
  app.register(documentRoutes, { prefix: SERVER_API_PREFIX });

  await app.register(cors);
  await app.register(serveStatic, { root });
  await app.listen({
    port: PORT,
    host: APP_HOST,
  });

  console.log(`Server running at http://${APP_HOST}:${PORT}`);
  console.log('app process uptime', process.uptime());
}

async function setupServerWrap() {
  try {
    await setupServer();
  } catch (cause) {
    const error = new Error('ERR_APP_START');
    error.cause = cause;

    console.error(error); //sentry
  }
}

export { setupServerWrap as setupServer };
