import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateDocumentMutation,
  useGetDocumentsByUserId,
} from '~/entities/document';
import { User } from '~/entities/user';

export function useMainPageModel() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const documentsByUserIdQuery = useGetDocumentsByUserId(User.getUserId());
  const createDocumentMutation = useCreateDocumentMutation({
    onSuccess(data) {
      navigate(`/document/${data.id}`);
    },
    onError() {
      setErrorMessage('Произошла ошибка, попробуйте позже');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    },
  });

  function createDocument() {
    createDocumentMutation.mutate(User.getUserId());
  }

  return {
    errorMessage,
    isGetDocumentsPending: documentsByUserIdQuery.isPending,
    documents: documentsByUserIdQuery.data,
    isCreateDocumentPending: createDocumentMutation.isPending,
    createDocument,
  };
}
