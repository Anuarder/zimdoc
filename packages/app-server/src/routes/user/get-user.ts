import { z } from 'zod';
import { FastifyPluginCallback } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetUserParamsScheme, UserReplyScheme } from '../../shared/scheme';
import { UserStorage } from '../../model';

export const getUserRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/get-user/:id',
    method: 'GET',
    schema: {
      params: GetUserParamsScheme,
      response: {
        200: UserReplyScheme,
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
          message: 'user id is required',
        });
      }

      const user = await UserStorage.getItem<z.infer<typeof UserReplyScheme>>(
        req.params.id
      );

      if (user) {
        return reply.code(200).send(user);
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
