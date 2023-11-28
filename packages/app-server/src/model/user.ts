import { prefixStorage } from 'unstorage';
import { storage } from './storage';

export const UserStorage = prefixStorage(storage, 'user');
