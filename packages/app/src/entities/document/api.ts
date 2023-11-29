import type { AxiosPromise } from 'axios';
import { http } from '~shared/api';
import type { DocumentType } from './types';

export const DocumentApi = {
  getDocumentsByUserId(userId: string): AxiosPromise<Array<DocumentType>> {
    return http.get(`/get-documents-by-user-id/${userId}`);
  },
  createDocument(userId: string): AxiosPromise<DocumentType> {
    return http.post('/create-document', {
      userId,
    });
  },
  getDocumentByDocumentId(id: string): AxiosPromise<DocumentType> {
    return http.get(`/get-document/${id}`);
  },
};
