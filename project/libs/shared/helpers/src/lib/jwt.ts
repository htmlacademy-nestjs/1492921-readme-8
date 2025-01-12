import { User, TokenPayload } from '@project/shared-types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    login: user.login,
    name: user.name,
  };
}
