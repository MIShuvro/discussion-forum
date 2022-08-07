import { TagService } from '../service/tag.service';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '../../../common/dto/base-api-response.dto';
import { TagLists, TagResDto } from '../dto/res/tag-res.dto';
import { TagCreateReqDto } from '../dto/req/tag-req.dto';

@ApiTags('Tag')
@Controller({path:'tags', version:'1'})
@UseInterceptors(ResponseInterceptor)
export class TagController{
  constructor(private tagService: TagService) {}

  @Post()
  @ApiCreatedResponse({type: SwaggerBaseApiResponse(TagResDto, HttpStatus.CREATED)})
  @ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
  async create(@Body() dto: TagCreateReqDto): Promise<BaseApiResponse<TagResDto>>{
    let tag = await this.tagService.create(dto)

    return {
      message:'Tag Created',
      data: tag
    }
  }

  @Get()
  @ApiOkResponse({type: SwaggerBaseApiResponse(TagLists, HttpStatus.OK)})
  @ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
  async find(): Promise<BaseApiResponse<TagLists>>{
    let tags = await this.tagService.find()
    return {
      message: 'Tags List',
      data: tags
    }
  }
}
