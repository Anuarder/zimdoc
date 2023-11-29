import type { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './config';
import { createDocumentRooms } from './entities/room';
import { handleUserEvents } from './handlers/user';
import { handleDocumentEvents } from './handlers/document';

export function registerDocumentNamespace(
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  const connection = io.of('/documents');
  const rooms = createDocumentRooms();

  connection.on('connection', socket => {
    handleUserEvents(connection, socket, rooms);
    handleDocumentEvents(connection, socket, rooms);
  });
}
