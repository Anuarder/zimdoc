import { FastifyPluginCallback } from 'fastify';

export const ping: FastifyPluginCallback = (app, _, done) => {
  app.get('/ping', () => 'pong');
  done();
};
