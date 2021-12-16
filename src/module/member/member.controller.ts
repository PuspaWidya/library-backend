import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  getAllMemberSwagger,
  registerDescriptionSwagger,
} from 'src/common/swaggerDescription';

@ApiTags('Member')
@ApiBearerAuth()
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({
    description: registerDescriptionSwagger,
  })
  @Public()
  @Post('register')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @ApiOperation({
    description: getAllMemberSwagger,
  })
  @Get()
  findAll() {
    return this.memberService.findAll();
  }
}
