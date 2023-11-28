import { z } from 'zod';
import { FastifyPluginCallback } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  DocumentReplyScheme,
  GetDocumentParamsScheme,
} from '../../shared/scheme';
import { DocumentStorage } from '../../model';

export const getDocumentRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/get-document/:id',
    method: 'GET',
    schema: {
      params: GetDocumentParamsScheme,
      response: {
        200: DocumentReplyScheme,
        400: z.object({
          statusCode: z.literal(400),
          error: z.literal('Bad Request'),
          message: z.string(),
        }),
        404: z.object({
          statusCode: z.literal(404),
          error: z.literal('Not found'),
          message: z.string(),
        }),
        500: z.object({
          statusCode: z.literal(500),
          error: z.literal('Internal Server Error'),
          message: z.string(),
        }),
      },
    },
    async handler(req, reply) {
      if (!req.params.id) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'document id is required',
        });
      }

      const document = await DocumentStorage.getItem<
        z.infer<typeof DocumentReplyScheme>
      >(req.params.id);

      if (document) {
        return reply.code(200).send(document);
      }

      return reply.code(404).send({
        statusCode: 404,
        error: 'Not found',
        message: 'document not found',
      });
    },
  });

  done();
};
