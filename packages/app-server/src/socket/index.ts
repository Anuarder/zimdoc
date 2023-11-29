import { Server } from 'socket.io';
import { FastifyInstance } from 'fastify';
import { ClientToServerEvents, ServerToClientEvents } from './document/config';
import { registerDocumentNamespace } from './document';

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

  registerDocumentNamespace(io);

  return io;
}
