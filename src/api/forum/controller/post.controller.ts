import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { PostService } from '../service/post.service';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '../../../common/dto/base-api-response.dto';
import { PostResDto } from '../dto/res/post-res.dto';
import { PostReqDto } from '../dto/req/post-req.dto';


@ApiTags('Post')
@Controller({path:'posts', version:'1'})
@UseInterceptors(ResponseInterceptor)
export class PostController{
  constructor(private postService: PostService) {
  }

  @Post()
  @ApiCreatedResponse({type: SwaggerBaseApiResponse(PostResDto, HttpStatus.OK)})
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async create(@Body() dto: PostReqDto): Promise<BaseApiResponse<PostResDto>>{
    let newPost = await this.postService.create(dto)
    return {
      message: 'Post Created',
      data: newPost
    }
  }
}
