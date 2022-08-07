import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '../../../common/dto/base-api-response.dto';
import { ThreadLists, ThreadResDto } from '../dto/res/thread-res.dto';
import { ThreadReqDto } from '../dto/req/thread-req.dto';
import { ThreadService } from '../service/thread.service';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

@ApiTags('Thread')
@Controller({path:'admin', version:'1'})
@UseInterceptors(ResponseInterceptor)
export class AdminController{

  constructor(private threadServic: ThreadService) {
  }

  @Post('threads')
  @ApiCreatedResponse({type: SwaggerBaseApiResponse(ThreadResDto, HttpStatus.CREATED)})
  @ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
  async createThread(@Body() dto: ThreadReqDto): Promise<BaseApiResponse<ThreadResDto>>{
    let thread = await this.threadServic.create(dto);
    return {
      message: 'Thread Created',
      data: thread
    }
  }

  @Get('thread/:thread_id')
  @ApiOkResponse({type: SwaggerBaseApiResponse(ThreadResDto, HttpStatus.OK)})
  @ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
  async getThread(@Param('thread_id') threadId: string): Promise<BaseApiResponse<ThreadResDto>>{
    const thread = await  this.threadServic.findOne(threadId)
    return {
      message: null,
      data: thread
    }
  }

  @Get('threads')
  @ApiOkResponse({type: SwaggerBaseApiResponse(ThreadLists, HttpStatus.OK)})
  @ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
  async getThreadsList(): Promise<BaseApiResponse<ThreadLists>>{
    let threads = await  this.threadServic.find()
    return {
      message: 'Threads List',
      data: threads
    }
  }

  @Patch('thread/:thread_id')
  @ApiOkResponse({type: SwaggerBaseApiResponse(ThreadResDto, HttpStatus.OK)})
  @ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
  async updateOne(@Param('thread_id') threadId: string, @Body() dto: ThreadReqDto): Promise<BaseApiResponse<ThreadResDto>>{
    let thread = await  this.threadServic.UpdateOne(threadId, dto)
    return {
      message:'Thread Updated',
      data: thread
    }
  }

@Delete('thread/:thread_id')
@ApiOkResponse({type: SwaggerBaseApiResponse(String, HttpStatus.OK)})
@ApiInternalServerErrorResponse({type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR)})
async deleteOne(@Param('thread_id') threadId: string): Promise<BaseApiResponse<String>> {
    await this.threadServic.deleteOne(threadId)
    return {
      message:'Thread Deleted',
      data: null
    }
  }
}
