import { BaseRepository } from '@common/database/repository/base.repository';
import { Tag, TagDocument } from '../shcema/tag.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository extends BaseRepository<TagDocument>{
  constructor(@InjectModel(Tag.name) private tag: Model<TagDocument>) {
    super(tag);
  }
}
