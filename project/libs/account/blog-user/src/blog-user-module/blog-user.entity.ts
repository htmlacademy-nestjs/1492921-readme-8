import { Entity } from '@project/shared-types';
import { StorableEntity, AuthUser } from '@project/shared-types';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public login: string;
  public firstname: string;
  public lastname: string;
  public avatarUrl: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.login = user.login;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatarUrl = user.avatarUrl;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      firstname: this.firstname,
      lastname: this.lastname,
      avatarUrl: this.avatarUrl,
      passwordHash: this.passwordHash,
    };
  }
}
