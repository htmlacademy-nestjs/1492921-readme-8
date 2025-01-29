import { compare, genSalt, hash } from 'bcrypt';

import { Entity } from '@project/shared-types';
import { StorableEntity, AuthUser } from '@project/shared-types';

import { DEFAULT_AVATAR, SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public avatarUrl: string;
  public registerDate: Date;
  public passwordHash: string;
  public postsCount: number;
  public subscribersCount: number;

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
    this.name = user.name;
    this.avatarUrl = user.avatarUrl ?? DEFAULT_AVATAR;
    this.registerDate = user.registerDate;
    this.passwordHash = user.passwordHash;
    this.postsCount = user.postsCount ?? 0;
    this.subscribersCount = user.subscribersCount ?? 0;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatarUrl: this.avatarUrl,
      registerDate: this.registerDate,
      passwordHash: this.passwordHash,
      postsCount: this.postsCount,
      subscribersCount: this.subscribersCount,
    };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
