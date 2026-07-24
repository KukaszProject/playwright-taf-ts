import { AUTH_CONFIG } from '../config/environment.config';

export const USER_DATA = {
  validUser: {
    username: AUTH_CONFIG.SAUCE_USERNAME,
    password: AUTH_CONFIG.SAUCE_PASSWORD,
  },
  lockedUser: {
    username: 'locked_out_user',
    password: AUTH_CONFIG.SAUCE_PASSWORD,
  },
  emptyUser: {
    username: '',
    password: '',
  },
};
