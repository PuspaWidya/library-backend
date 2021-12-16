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
    description: `member's registered email, with minimal length 6 and maximal length 30`,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty()
  email: string;

  @ApiProperty({
    description: `member's registered password, with minimal length 6 and maximal length 30`,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty()
  password: string;
}
