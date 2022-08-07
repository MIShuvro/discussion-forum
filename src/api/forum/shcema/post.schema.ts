import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../dto/req/post-req.dto';
import mongoose, { Document } from 'mongoose';
import { Tag } from './tag.schema';
import { Thread } from './thread.schema';

export type PostDocument = Post & Document

@Schema({
  timestamps: true,
  collection: 'posts'
})
export class Post{

  @Prop()
  title: string

  @Prop()
  body: string

  @Prop()
  slug: string

  @Prop()
  is_anonymous: boolean

  @Prop({default: 0})
  vote_count: number

  @Prop({default: 0})
  views_count: number

  @Prop({default: 0})
  up_vote_count: number

  @Prop({default: 0})
  down_vote_count: number

  @Prop({type: Object})
  user: any

  @Prop([{type: mongoose.Types.ObjectId, ref: 'Tag'}])
  tags_id: Tag[]

  @Prop({type: mongoose.Types.ObjectId, ref: 'Thread'})
  thread_id: Thread
}

export const PostSchema = SchemaFactory.createForClass(Post)
PostSchema.pre<Post>('save', function(){
  this.slug = this.title.toLowerCase().split(' ').join("-")
})
