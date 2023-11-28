import { FastifyPluginCallback } from 'fastify';
import { createUserRoute } from './create-user';
import { getUserRoute } from './get-user';

export const userRoutes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(createUserRoute);
  fastify.register(getUserRoute);

  done();
};
