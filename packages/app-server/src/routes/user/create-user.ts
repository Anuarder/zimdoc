import { z } from 'zod';
import { v4 as createUUID } from 'uuid';
import { FastifyPluginCallback } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CreateUserRequestScheme, UserReplyScheme } from '../../shared/scheme';
import { UserStorage } from '../../model';

export const createUserRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/create-user',
    method: 'POST',
    schema: {
      body: CreateUserRequestScheme,
      response: {
        200: UserReplyScheme,
        400: z.object({
          statusCode: z.literal(400),
          error: z.literal('Bad Request'),
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
      if (!req.body.username) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'username is required',
        });
      }

      const { username } = req.body;
      const uuid = createUUID();

      await UserStorage.setItem(uuid, {
        id: uuid,
        username,
      });

      return reply.code(200).send({
        id: uuid,
        username,
      });
    },
  });

  done();
};
