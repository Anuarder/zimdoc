import { Server } from 'socket.io';
import { FastifyInstance } from 'fastify';
import {
  Events,
  ClientToServerEvents,
  ServerToClientEvents,
} from './event-types';

export function createSocketInstance(app: FastifyInstance) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(
    app.server,
    {
      cors: {
        origin: '*',
        allowedHeaders: '*',
      },
    }
  );

  let count = 0;
  const documentSocket = io.of('/docs');

  documentSocket.on('connection', socket => {
    function joinToDoc(docId: string) {
      socket.join(docId);
    }

    socket.on(Events.JOIN_DOC, (docId: string) => {
      joinToDoc(docId);
    });

    socket.on(Events.UPDATE_COUNT, (room: string) => {
      count += 1;

      if (room) {
        documentSocket.to(room).emit('update-count', count);
      } else {
        socket.broadcast.emit('update-count', count);
      }
    });
  });

  return io;
}
