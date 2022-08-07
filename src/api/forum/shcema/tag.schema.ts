import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document

@Schema({
  timestamps: true,
  collection: 'tags'
})
export class Tag{
  @Prop()
  title: string

  @Prop({unique: true})
  slug: string

  @Prop()
  post_count: number

}

export const TagSchema = SchemaFactory.createForClass(Tag)

TagSchema.pre<Tag>('save', function(){
  this.slug = this.title.toLowerCase().split(" ").join("-")
})
