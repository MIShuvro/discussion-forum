import { BaseRepository } from '@common/database/repository/base.repository';
import { Thread, ThreadDocument } from '../shcema/thread.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export  class ThreadRepository extends BaseRepository<ThreadDocument>{
  constructor(@InjectModel(Thread.name) private thread: Model<ThreadDocument>) {
    super(thread);
  }
}
