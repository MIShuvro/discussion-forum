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
    }

    newPost.tags = tags
    newPost.thread = thread
    return plainToInstance(PostResDto,newPost,{excludeExtraneousValues: true, enableImplicitConversion: true} )
  }

  async findOne(postId: string): Promise<PostResDto>{
    let post:any = await this.repository.findOne({_id: postId})
    let thread = await this.threadRepository.findOne({_id: post.thread_id})
    post.thread = thread?thread: null
    let tags = []
    if(post.tags_id.length){
      tags = await this.tagRepository.find({_id:{$in:post.tags_id}})
      post.tags = tags
    }
    return plainToInstance(PostResDto, post,{excludeExtraneousValues: true, enableImplicitConversion: true})
  }

  async find(): Promise<PostListResDto>{
    let posts:any = await this.repository.find({})
    for (const post of posts) {
      if(post.thread_id){
        let thread = await this.threadRepository.findOne({_id: post.thread_id})
        post.thread = thread
        if(post.tags_id.length){
          let tags = await this.tagRepository.find({_id: {$in: post.tags_id}})
          post.tags = tags
        }
      }
    }
    return plainToInstance(PostListResDto, {posts}, {enableImplicitConversion: true, excludeExtraneousValues: true})
  }
}
