import { z } from 'zod';

export const CreateDocumentRequestScheme = z.object({
  userId: z.string(),
});

export const DocumentReplyScheme = z.object({
  id: z.string(),
  author: z.string(),
  author_username: z.string(),
  title: z.string(),
  content: z.string(),
});

export const GetDocumentParamsScheme = z.object({
  id: z.string(),
});

export const GetDocumentsByUserIdParamsScheme = z.object({
  userId: z.string(),
});
