import { prefixStorage } from 'unstorage';
import { z } from 'zod';
import { storage } from './storage';

export const DocumentModel = z.object({
  id: z.string(),
  author: z.string(),
  author_username: z.string(),
  title: z.string(),
  content: z.string(),
});

export type DocumentType = z.infer<typeof DocumentModel>;

export const DocumentStorage = prefixStorage(storage, 'document');
