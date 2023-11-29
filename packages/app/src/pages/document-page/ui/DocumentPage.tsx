import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UiBaseLayout } from '~shared/ui';
import { env } from '~shared/config';

import { useUserConnection, useDocumentConnection } from '../model';
import { ConnectedUsers } from './components/ConnectedUsers.tsx';
import { Document } from './components/Document.tsx';

const connection = io(env.SOCKET_URL);

export function DocumentPage() {
  const { id } = useParams();

  const { connectedUsers, handleUserSocketConnection, disconnectUser } =
    useUserConnection(id as string);

  const { document, onUpdateDocumentText, handleDocumentSocketConnection } =
    useDocumentConnection(id as string);

  function onDocumentContentChanged(text: string) {
    onUpdateDocumentText(connection, text);
  }

  useEffect(() => {
    handleUserSocketConnection(connection);
    handleDocumentSocketConnection(connection);

    return () => {
      disconnectUser(connection);
    };
  }, []);

  return (
    <UiBaseLayout>
      <section className="flex h-full w-full flex-col overflow-auto bg-white">
        <ConnectedUsers
          className="absolute right-6 top-6"
          users={connectedUsers}
        />
        <div className="flex flex-1 flex-col px-6 pb-4 pt-10">
          {document ? (
            <Document
              document={document}
              onChange={e => onDocumentContentChanged(e.target.value)}
            />
          ) : (
            'Загрузка...'
          )}
        </div>
      </section>
    </UiBaseLayout>
  );
}
