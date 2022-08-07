import { PostRepository } from '../repository/post.repository';
import { PostReqDto } from '../dto/req/post-req.dto';
import { PostListResDto, PostResDto } from '../dto/res/post-res.dto';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { ThreadRepository } from '../repository/thread.repository';
import { TagRepository } from '../repository/tag.repository';

@Injectable()
export class PostService{
  constructor(protected repository: PostRepository, protected threadRepository: ThreadRepository, protected tagRepository: TagRepository) {
  }

  async create(dto: PostReqDto): Promise<PostResDto>{

    let newPost:any = await this.repository.create(dto)
    let thread, tags
    if(newPost){
      thread = await this.threadRepository.findOne({_id: newPost.thread_id})
      tags = await this.tagRepository.find({_id:{$in: newPost.tags_id}})
      console.log('tags',tags)
    }

    newPost.tags = tags
    newPost.thread = thread

    console.log('newPost', newPost)
    return plainToInstance(PostResDto,newPost,{excludeExtraneousValues: true, enableImplicitConversion: true} )
  }

  async findOne(postId: string): Promise<PostResDto>{
    let post = await this.repository.findOne({_id: postId})
    return plainToInstance(PostResDto, post,{excludeExtraneousValues: true, enableImplicitConversion: true})
  }

  async find(): Promise<PostListResDto>{
    let posts = await this.repository.find({})
    return plainToInstance(PostListResDto, {posts}, {enableImplicitConversion: true, excludeExtraneousValues: true})
  }
}
