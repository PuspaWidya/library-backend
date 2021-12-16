import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    description: `member's fullname with minimal length 6 and maximal length 30`,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: `member's email, must be unique with minimal length 6 and maximal length 30`,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  email: string;

  @ApiProperty({
    description: `member's password, with minimal length 6 and maximal length 30`,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description: `member's username, must be unique with minimal length 6 and maximal length 30`,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  username: string;
}
