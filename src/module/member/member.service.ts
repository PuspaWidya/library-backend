import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilterException } from 'src/common/filterException';
import {
  EmailAlreadyExistedError,
  MemberNotFoundError,
  successConstant,
} from 'src/common/responseCode';
import { Book } from 'src/entities/book.entity';
import { Member } from 'src/entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member) private readonly memberRepository: typeof Member,
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    try {
      const checkData = await this.memberRepository.findOne({
        where: {
          email: createMemberDto.email,
        },
      });

      if (checkData) {
        throw new ConflictException(EmailAlreadyExistedError);
      }

      await this.memberRepository.create(createMemberDto);

      return {
        ...successConstant,
      };
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async findAll() {
    try {
      let allMember = await this.memberRepository.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        include: [{ model: Book }],
      });

      if (allMember.length == 0) {
        throw new NotFoundException(MemberNotFoundError);
      }

      return {
        ...successConstant,
        allMember,
      };
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async findOne(email: string) {
    return this.memberRepository.findOne({
      where: {
        email,
      },
    });
  }
}
