import { FastifyPluginCallback } from 'fastify';
import { createDocumentRoute } from './create-document';
import { getDocumentRoute } from './get-document';
import { getDocumentsByUserIdRoute } from './get-documents-by-user-id';

export const documentRoutes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(createDocumentRoute);
  fastify.register(getDocumentRoute);
  fastify.register(getDocumentsByUserIdRoute);
  done();
};
