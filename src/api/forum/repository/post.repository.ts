import { BaseRepository } from '@common/database/repository/base.repository';
import { Post, PostDocument } from '../shcema/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends BaseRepository<PostDocument>{
  constructor(@InjectModel(Post.name) private postEntity: Model<PostDocument>) {
    super(postEntity);
  }
}
