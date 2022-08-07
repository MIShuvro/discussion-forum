import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tags: Tag[]
}
export class Tag {
  title: string;
}

export class TagCreateReqDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class TagUpdateReqDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
