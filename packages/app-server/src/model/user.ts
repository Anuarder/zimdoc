import { prefixStorage } from 'unstorage';
import { z } from 'zod';
import { storage } from './storage';

export const UserModel = z.object({
  id: z.string(),
  username: z.string(),
});

export type UserType = z.infer<typeof UserModel>;

export const UserStorage = prefixStorage(storage, 'user');
