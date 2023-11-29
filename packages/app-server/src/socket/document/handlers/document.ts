import { Namespace, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ON_DOCUMENT_SYNC,
  ON_DOCUMENT_SYNC_SUCCESS,
  ON_DOCUMENT_UPDATE_CONTENT,
  ServerToClientEvents,
} from '../config';
import {
  DocumentStorage,
  DocumentType,
  UserStorage,
  UserType,
} from '../../../model';
import { createDocumentRooms } from '../entities/room';

type DocumentId = DocumentType['id'];
type UserId = UserType['id'];

export function handleDocumentEvents(
  connection: Namespace<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket,
  rooms: ReturnType<typeof createDocumentRooms>
) {
  socket.on(ON_DOCUMENT_SYNC, async (documentId: DocumentId) => {
    const document = await DocumentStorage.getItem<DocumentType | null>(
      documentId
    );

    socket.join(documentId);

    if (document) {
      connection.to(documentId).emit(ON_DOCUMENT_SYNC_SUCCESS, document);
    }
  });

  socket.on(
    ON_DOCUMENT_UPDATE_CONTENT,
    async (documentId: DocumentId, userId: UserId, content: string) => {
      const document = await DocumentStorage.getItem<DocumentType | null>(
        documentId
      );
      const user = await UserStorage.getItem<UserType | null>(userId);

      if (document && user) {
        socket.join(documentId);
        document.content = content;
        await DocumentStorage.setItem(documentId, { ...document, content });

        connection.to(documentId).emit(ON_DOCUMENT_UPDATE_CONTENT, document);
      }
    }
  );
}
