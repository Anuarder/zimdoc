import { DocumentType, UserType } from '../../../../model';

export function createDocumentRooms() {
  const documentRoomMap = new Map<DocumentType['id'], Array<UserType>>();

  function addUser(documentId: DocumentType['id'], user: UserType) {
    if (!documentRoomMap.has(documentId)) {
      documentRoomMap.set(documentId, [user]);
    }

    if (!documentRoomMap.get(documentId)?.some(v => v.id === user.id)) {
      documentRoomMap.get(documentId)?.push(user);
    }
  }

  function removeUser(documentId: DocumentType['id'], userId: UserType['id']) {
    if (documentRoomMap.has(documentId)) {
      const withoutUser = documentRoomMap
        .get(documentId)
        ?.filter(v => v.id !== userId);

      documentRoomMap.set(documentId, withoutUser as Array<UserType>);
    }
  }

  function getConnectedUsers(documentId: DocumentType['id']) {
    return documentRoomMap.get(documentId) as Array<UserType>;
  }

  return {
    addUser,
    removeUser,
    getConnectedUsers,
  };
}
