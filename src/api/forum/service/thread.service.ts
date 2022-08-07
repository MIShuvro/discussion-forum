import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { ThreadRepository } from '../repository/thread.repository';
import { ThreadReqDto } from '../dto/req/thread-req.dto';
import { ThreadLists, ThreadResDto } from '../dto/res/thread-res.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ThreadService{
  constructor(private repository: ThreadRepository) {}

  async create (dto: ThreadReqDto): Promise<ThreadResDto>{
    const newThread = await  this.repository.create(dto)
    return  plainToInstance(ThreadResDto, newThread, {excludeExtraneousValues: true, enableImplicitConversion: true})
  }

  async findOne( threadId: string): Promise<ThreadResDto>{
    const thread  = await this.repository.findOne({_id: threadId})
    return plainToInstance(ThreadResDto, thread,{enableImplicitConversion: true, excludeExtraneousValues: true})
  }

  async find(): Promise<ThreadLists>{
    let threads = await  this.repository.find({})
    return plainToInstance(ThreadLists, {threads},{ excludeExtraneousValues: true, enableImplicitConversion: true})
  }

  async UpdateOne(threadId: string, dto: ThreadReqDto): Promise<ThreadResDto>{
    let thread = await  this.repository.findOne({_id: threadId})
    if(!thread) throw new NotFoundException('Thread Not Found')
    if(dto.title){
      (dto as any).slug = dto.title.toLowerCase().split(" ").join("-")
    }
    await this.repository.findOneAndUpdate({_id: threadId}, dto)
    let updatedThread = await this.repository.findOne({_id: threadId})
    return plainToInstance(ThreadResDto, updatedThread, {enableImplicitConversion: true, excludeExtraneousValues: true})
  }

  async deleteOne(threadId: string): Promise<string>{
    let thread = await  this.repository.findOne({_id: threadId})
    if(!thread) throw new NotFoundException('Thread Not Found')
    return await this.repository.deleteOne({_id: threadId})

  }
}
