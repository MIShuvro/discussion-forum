import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { ThreadRepository } from '../repository/thread.repository';
import { ThreadReqDto } from '../dto/req/thread-req.dto';
import { ThreadLists, ThreadResDto } from '../dto/res/thread-res.dto';
import { plainToInstance } from 'class-transformer';
import { TagRepository } from '../repository/tag.repository';
import { TagCreateReqDto, TagReqDto, TagUpdateReqDto } from '../dto/req/tag-req.dto';
import { TagLists, TagResDto } from '../dto/res/tag-res.dto';

@Injectable()
export class TagService{
  constructor(private repository: TagRepository) {}

  async createMany(dto: TagReqDto){
    return await this.repository.createMany(dto as any);
  }

  async create (dto: TagCreateReqDto): Promise<TagResDto>{
    const newTag = await  this.repository.create(dto)
    return  plainToInstance(TagResDto, newTag, {excludeExtraneousValues: true, enableImplicitConversion: true})
  }

  async findOne( tagId: string): Promise<TagResDto>{
    const tag  = await this.repository.findOne({_id: tagId})
    return plainToInstance(TagResDto, tag,{enableImplicitConversion: true, excludeExtraneousValues: true})
  }

  async find(): Promise<TagLists>{
    let tags = await this.repository.find({})
    return plainToInstance(TagLists, {tags},{ excludeExtraneousValues: true, enableImplicitConversion: true})
  }

  async UpdateOne(tagId: string, dto: TagUpdateReqDto): Promise<TagResDto>{
    let tag = await  this.repository.findOne({_id: tagId})
    if(!tag) throw new NotFoundException('Tag Not Found')
    if(dto.title){
      (dto as any).slug = dto.title.toLowerCase().split(" ").join("-")
    }
    await this.repository.findOneAndUpdate({_id: tagId}, dto)
    let updatedTag = await this.repository.findOne({_id: tagId})
    return plainToInstance(TagResDto, updatedTag, {enableImplicitConversion: true, excludeExtraneousValues: true})
  }

  async deleteOne(tagId: string): Promise<string>{
    let tag = await  this.repository.findOne({_id: tagId})
    if(!tag) throw new NotFoundException('Tag Not Found')
    return await this.repository.deleteOne({_id: tagId})

  }
}
