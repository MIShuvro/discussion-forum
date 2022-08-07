import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class TagResDto {

  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  post_count: number

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class TagLists {

  @ApiProperty({type: [TagResDto]})
  @Expose()
  @Transform(value=> value.obj.tags)
  tags: TagResDto[]

}
