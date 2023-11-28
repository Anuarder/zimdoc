import { z } from 'zod';

export const CreateUserRequestScheme = z.object({
  username: z.string(),
});

export const UserReplyScheme = z.object({
  id: z.string(),
  username: z.string(),
});

export const GetUserParamsScheme = z.object({
  id: z.string(),
});
