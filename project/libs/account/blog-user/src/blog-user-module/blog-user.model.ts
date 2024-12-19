import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser } from '@project/shared-types';

@Schema({
  collection: 'accounts',
  timestamps: { createdAt: 'registerDate' },
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
    unique: true,
  })
  public login: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop()
  public avatarUrl: string;

  @Prop({
    required: false,
  })
  public registerDate: Date;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
