import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Member } from 'src/entities/member.entity';

@Module({
  imports: [SequelizeModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
