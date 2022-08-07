import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';


export class Thread {
  @ApiProperty()
  @Expose()
  _id:       string;

  @ApiProperty()
  @Expose()
  title:     string;

  @ApiProperty()
  @Expose()
  slug:      string;

  @ApiProperty()
  @Expose()
  createdAt: string;
}
export class Tag {
  @ApiProperty()
  @Expose()
  _id:       string;

  @ApiProperty()
  @Expose()
  title:     string;

  @ApiProperty()
  @Expose()
  slug:      string;

  @ApiProperty()
  @Expose()
  createdAt: string;
}


export class User {
  @ApiProperty()
  @Expose()
  _id:         string;

  @ApiProperty()
  @Expose()
  name:        string;

  @ApiProperty()
  @Expose()
  profile_img: string;

  @ApiProperty()
  @Expose()
  email:       string;
}

export class PostResDto {

  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  title:           string;

  @ApiProperty()
  @Expose()
  is_anonymous:    boolean;

  @ApiProperty()
  @Expose()
  vote_count:      number;

  @ApiProperty()
  @Expose()
  views_count:     number;

  @ApiProperty()
  @Expose()
  up_vote_count:   number;

  @ApiProperty()
  @Expose()
  down_vote_count: number;

  @ApiProperty({type: User})
  @Expose()
  @Transform(value=> plainToInstance(User, value.obj.user, {excludeExtraneousValues: true, enableImplicitConversion: true}))
  user:  User;

  @ApiProperty({type: Thread})
  @Expose()
  @Transform(value=> plainToInstance(Thread, value.obj.thread, {excludeExtraneousValues: true, enableImplicitConversion: true}))
  thread: Thread;

  @ApiProperty({type:[Tag]})
  @Expose()
  @Transform(value=> plainToInstance(Tag, value.obj.tags,{excludeExtraneousValues: true, enableImplicitConversion: true}))
  tags: Tag[];
}


export class PostListResDto{
  @ApiProperty({type:[PostResDto]})
  @Expose()
  @Transform(value=> plainToInstance(PostResDto, value.obj.posts,{enableImplicitConversion: true, excludeExtraneousValues: true}))
  posts: PostResDto[]
}
