import { Namespace, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ON_USER_CONNECTED,
  ON_USER_CONNECTED_SUCCESS,
  ON_USER_DISCONNECTED,
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

export function handleUserEvents(
  connection: Namespace<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket,
  rooms: ReturnType<typeof createDocumentRooms>
) {
  socket.on(
    ON_USER_CONNECTED,
    async (documentId: DocumentId, userId: UserId) => {
      const document = await DocumentStorage.getItem<DocumentType | null>(
        documentId
      );
      const user = await UserStorage.getItem<UserType | null>(userId);

      if (document && user) {
        socket.join(documentId);
        rooms.addUser(documentId, user);

        connection
          .to(documentId)
          .emit(
            ON_USER_CONNECTED_SUCCESS,
            rooms.getConnectedUsers(documentId),
            document
          );
      }
    }
  );

  socket.on(
    ON_USER_DISCONNECTED,
    async (documentId: DocumentId, userId: UserId) => {
      rooms.removeUser(documentId, userId);

      connection
        .to(documentId)
        .emit(ON_USER_DISCONNECTED, rooms.getConnectedUsers(documentId));

      socket.leave(documentId);
    }
  );
}
