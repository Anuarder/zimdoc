import { z } from 'zod';
import { FastifyPluginCallback } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  DocumentReplyScheme,
  GetDocumentsByUserIdParamsScheme,
} from '../../shared/scheme';
import { DocumentStorage, UserStorage } from '../../model';

export const getDocumentsByUserIdRoute: FastifyPluginCallback = (
  fastify,
  _,
  done
) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/get-documents-by-user-id/:userId',
    method: 'GET',
    schema: {
      params: GetDocumentsByUserIdParamsScheme,
      response: {
        200: z.array(DocumentReplyScheme),
        400: z.object({
          statusCode: z.literal(400),
          error: z.literal('Bad Request'),
          message: z.string(),
        }),
        404: z.object({
          statusCode: z.literal(404),
          error: z.literal('User not found'),
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
      if (!req.params.userId) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'user id is required',
        });
      }

      const user = await UserStorage.getItem(req.params.userId);

      if (!user) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'User not found',
          message: '',
        });
      }

      const documentKeys = await DocumentStorage.getKeys();
      const documents: Array<z.infer<typeof DocumentReplyScheme> | null> = [];

      for (const documentId of documentKeys) {
        documents.push(
          // eslint-disable-next-line no-await-in-loop
          await DocumentStorage.getItem<z.infer<typeof DocumentReplyScheme>>(
            documentId
          )
        );
      }

      const filteredDocuments = documents.filter(doc => {
        return doc && doc.author === req.params.userId;
      }) as Array<z.infer<typeof DocumentReplyScheme>>;

      return reply.code(200).send(filteredDocuments);
    },
  });

  done();
};
