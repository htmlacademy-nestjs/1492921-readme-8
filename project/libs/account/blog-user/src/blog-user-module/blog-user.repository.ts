import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserModel } from './blog-user.model';

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<
  BlogUserEntity,
  BlogUserModel
> {
  constructor(
    entityFactory: BlogUserFactory,
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    if (!email) {
      return null;
    }
    const document = await this.model
      .findOne({ email: { $regex: new RegExp(email, 'i') } })
      .exec();
    return this.createEntityFromDocument(document);
  }
}
