export const Events = {
  UPDATE_COUNT: 'update-count' as const,
  JOIN_DOC: 'join-doc' as const,
};

export interface ServerToClientEvents {
  [Events.UPDATE_COUNT]: (v: number) => void;
  [Events.JOIN_DOC]: (docId: string) => void;
}

export interface ClientToServerEvents {
  [Events.UPDATE_COUNT]: (room: string) => void;
  [Events.JOIN_DOC]: (docId: string) => void;
}
