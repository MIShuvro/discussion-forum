
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThreadDocument = Thread & Document

@Schema({
  timestamps: true,
  collection: 'threads'
})
export class Thread{
  @Prop()
  title: string;

  @Prop({unique: true})
  slug: string
}

export const ThreadSchema = SchemaFactory.createForClass(Thread)

ThreadSchema.pre<Thread>('save', function(){
  this.slug = this.title.toLowerCase().split(" ").join("-")
})
