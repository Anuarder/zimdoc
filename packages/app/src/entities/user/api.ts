import type { AxiosPromise } from 'axios';
import { http } from '~shared/api';
import type { UserType } from './types';

export const UserApi = {
  createUser({ username }: { username: string }): AxiosPromise<UserType> {
    return http.post('/create-user', {
      username,
    });
  },
};
