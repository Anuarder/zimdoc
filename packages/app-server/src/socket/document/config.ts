import { DocumentType, UserType } from '../../model';

export const ON_USER_CONNECTED = 'document:user-connected';
export const ON_USER_CONNECTED_SUCCESS = 'document:user-connected-success';
export const ON_USER_DISCONNECTED = 'document:user-disconnected';
export const ON_DOCUMENT_SYNC = 'document:sync';
export const ON_DOCUMENT_SYNC_SUCCESS = 'document:sync-success';
export const ON_DOCUMENT_UPDATE_CONTENT = 'document:update-content';

type DocumentId = DocumentType['id'];
type UserId = UserType['id'];

export interface ServerToClientEvents {
  [ON_USER_CONNECTED]: (documentId: DocumentId, userId: UserId) => void;
  [ON_USER_CONNECTED_SUCCESS]: (
    users: Array<UserType>,
    document: DocumentType
  ) => void;
  [ON_USER_DISCONNECTED]: (users: Array<UserType>) => void;
  [ON_DOCUMENT_SYNC_SUCCESS]: (document: DocumentType) => void;
  [ON_DOCUMENT_UPDATE_CONTENT]: (document: DocumentType) => void;
}

export interface ClientToServerEvents {
  [ON_USER_CONNECTED]: (documentId: DocumentId, userId: UserId) => void;
  [ON_USER_CONNECTED_SUCCESS]: (users: Array<UserType>) => void;
  [ON_USER_DISCONNECTED]: (documentId: DocumentId, userId: UserId) => void;
  [ON_DOCUMENT_SYNC]: (documentId: DocumentId) => void;
  [ON_DOCUMENT_UPDATE_CONTENT]: (
    documentId: DocumentId,
    userId: UserId,
    content: string
  ) => void;
}
