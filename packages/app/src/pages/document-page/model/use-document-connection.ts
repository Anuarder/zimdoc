import { useState } from 'react';
import { DocumentType } from '~/entities/document';
import { Socket } from 'socket.io-client';
import { User } from '~/entities/user';

export function useDocumentConnection(documentId: string) {
  const [document, setDocument] = useState<DocumentType>();

  function handleDocumentSocketConnection(connection: Socket) {
    connection.emit('document:sync', documentId);
    connection.on('document:sync-success', document => {
      setDocument(document);
    });
    connection.on('document:update-content', document => {
      setDocument(document);
    });
  }

  function onUpdateDocumentText(connection: Socket, text: string) {
    if (document) {
      setDocument({ ...document, content: text });
      connection.emit(
        'document:update-content',
        documentId,
        User.getUserId(),
        text
      );
    }
  }

  return {
    document,
    setDocument,
    handleDocumentSocketConnection,
    onUpdateDocumentText,
  };
}
