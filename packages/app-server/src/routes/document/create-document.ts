import { z } from 'zod';
import { v4 as createUUID } from 'uuid';
import { FastifyPluginCallback } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  CreateDocumentRequestScheme,
  DocumentReplyScheme,
  UserReplyScheme,
} from '../../shared/scheme';
import { UserStorage, DocumentStorage } from '../../model';

export const createDocumentRoute: FastifyPluginCallback = (
  fastify,
  _,
  done
) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/create-document',
    method: 'POST',
    schema: {
      body: CreateDocumentRequestScheme,
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
      if (!req.body.userId) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'user id is required',
        });
      }

      const { userId } = req.body;

      const user =
        await UserStorage.getItem<z.infer<typeof UserReplyScheme>>(userId);

      if (user) {
        const uuid = createUUID();
        const document = {
          id: uuid,
          author: userId,
          author_username: user.username,
          title: 'Новый документ',
          content: '',
        };

        await DocumentStorage.setItem(uuid, document);

        return reply.code(200).send(document);
      }

      return reply.code(404).send({
        statusCode: 404,
        error: 'Not found',
        message: 'user not found',
      });
    },
  });

  done();
};
