import destr from 'destr';
import type { UserType } from './types';

export const User = {
  setData(user: UserType) {
    sessionStorage.setItem('user:data', JSON.stringify(user));
  },
  getData() {
    return destr<UserType | null>(sessionStorage.getItem('user:data'));
  },
  isAuthenticated() {
    const data = this.getData();

    return Boolean(data && data.id);
  },
  getUserId() {
    /**
     * @description
     * Использую assertion, потому что userId используется только в protected route.
     * Если бы это было production product, то нужно сделать авторизацию иначе
     * */
    const data = this.getData() as UserType;

    return data.id;
  },
};
