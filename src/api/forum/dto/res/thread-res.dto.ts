import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class ThreadResDto {

  @ApiProperty()
  @Expose()
  _id:        string;

  @ApiProperty()
  @Expose()
  title:      string;

  @ApiProperty()
  @Expose()
  slug:       string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class ThreadLists {

  @ApiProperty({type: [ThreadResDto]})
  @Expose()
  @Transform(value=> value.obj.threads)
  threads: ThreadResDto[]

}
