import { useMutation, useQuery } from '@tanstack/react-query';
import { DocumentApi } from './api';
import type { DocumentType } from './types';

export function useGetDocumentByIdQuery(id: string) {
  return useQuery({
    queryKey: ['get-document-by-id', id],
    queryFn: () =>
      DocumentApi.getDocumentByDocumentId(id).then(({ data }) => data),
  });
}

export function useGetDocumentsByUserId(userId: string) {
  return useQuery({
    queryKey: ['get-documents-by-user-id', userId],
    queryFn: () =>
      DocumentApi.getDocumentsByUserId(userId)
        .then(({ data }) => data)
        .catch(cause => {
          const error = new Error('ERR_GET_DOCUMENTS_BY_USER_ID', { cause });
          console.log(error); //sentry

          throw error;
        }),
  });
}

interface CreateDocumentMutationProps {
  onSuccess: (data: DocumentType) => void;
  onError: () => void;
}

export function useCreateDocumentMutation(props: CreateDocumentMutationProps) {
  return useMutation({
    mutationKey: ['create-document-mutation'],
    mutationFn: (userId: string) =>
      DocumentApi.createDocument(userId)
        .then(({ data }) => {
          props.onSuccess(data);
          return data;
        })
        .catch(cause => {
          props.onError();

          const error = new Error('ERR_CREATE_DOCUMENT', { cause });

          console.log(error); //sentry

          throw error;
        }),
  });
}
