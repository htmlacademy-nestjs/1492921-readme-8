import { TokenPayload } from '@project/shared-types';
export interface RequestWithTokenPayload {
  user?: TokenPayload;
}
