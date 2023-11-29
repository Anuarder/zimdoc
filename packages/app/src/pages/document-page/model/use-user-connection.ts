import { useState } from 'react';
import { User, UserType } from '~/entities/user';
import type { Socket } from 'socket.io-client';

export function useUserConnection(documentId: string) {
  const [connectedUsers, setConnectedUsers] = useState<Array<UserType>>([]);

  function handleUserSocketConnection(connection: Socket) {
    connection.emit('document:user-connected', documentId, User.getUserId());
    connection.on('document:user-connected-success', users => {
      setConnectedUsers(users);
    });
    connection.on('document:user-disconnected', users => {
      setConnectedUsers(users);
    });
  }

  function disconnectUser(connection: Socket) {
    connection.emit('document:user-disconnected', documentId, User.getUserId());
  }

  return {
    handleUserSocketConnection,
    connectedUsers,
    disconnectUser,
  };
}
