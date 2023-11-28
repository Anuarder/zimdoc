import { prefixStorage } from 'unstorage';
import { storage } from './storage';

export const DocumentStorage = prefixStorage(storage, 'document');
