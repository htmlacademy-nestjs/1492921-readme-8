import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

import { User } from '@project/shared-types';

import { AuthenticationService } from '../authentication-module/authentication.service';

const USERNAME_FIELD_NAME = 'login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(login: string, password: string): Promise<User> {
    return this.authService.verifyUser({ login, password });
  }
}
