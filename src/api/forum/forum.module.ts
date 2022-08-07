import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Thread, ThreadSchema } from './shcema/thread.schema';
import { ThreadService } from './service/thread.service';
import { ThreadRepository } from './repository/thread.repository';
import { Tag, TagSchema } from './shcema/tag.schema';
import { TagService } from './service/tag.service';
import { TagRepository } from './repository/tag.repository';
import { TagController } from './controller/tag.controller';
import { Post, PostSchema } from './shcema/post.schema';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Thread.name,
        useFactory: ()=>{
          const Schema = ThreadSchema;
          return Schema;
        }
      },
      {
        name: Tag.name,
        useFactory: ()=>{
          const Schema = TagSchema;
          return Schema
        }
      },
      {
        name: Post.name,
        useFactory: ()=>{
          const Schema = PostSchema
          Schema.plugin(require('mongoose-paginate-v2'));
          return Schema
        }
      }
    ])
  ],
  providers:[ThreadService, ThreadRepository, TagService, TagRepository, PostService, PostRepository],
  controllers: [AdminController, TagController, PostController]
})
export class ForumModule {}
