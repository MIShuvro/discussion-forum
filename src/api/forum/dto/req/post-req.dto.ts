import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';


export class User {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  profile_img: string;

  @ApiProperty()
  @IsString()
  email: string;
}

export class PostReqDto {

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsBoolean()
  is_anonymous:    boolean;

  // @ApiProperty()
  // @IsNumber()
  // @IsOptional()
  // vote_count: number;
  //
  // @ApiProperty()
  // @IsNumber()
  // @IsOptional()
  // views_count: number;
  //
  // @ApiProperty()
  // @IsNumber()
  // @IsOptional()
  // up_vote_count: number;
  //
  // @ApiProperty()
  // @IsNumber()
  // @IsOptional()
  // down_vote_count: number;

  @ApiProperty({type: User})
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsString()
  thread_id: string;

  @ApiProperty({type: [String]})
  @IsString({each: true})
  // @ValidateNested()
  @IsOptional()
  tags_id: string[];
}


