import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { FilterException } from 'src/common/filterException';
import {
  BookNotBorrowedByUserError,
  BookNotExistError,
  MemberAlreadyBorrowedTwoBook,
  MemberArePenalizedError,
  MemberNotFoundError,
  successConstant,
} from 'src/common/responseCode';
import { Book } from 'src/entities/book.entity';
import LogBorrowedBook from 'src/entities/logBorrowedBook.entity';
import { Member } from 'src/entities/member.entity';
import { LoanBookDto } from './dto/loan-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
const { Op } = require('sequelize');

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book) private readonly bookRepository: typeof Book,
    @InjectModel(Member) private readonly memberRepository: typeof Member,
    @InjectModel(LogBorrowedBook)
    private readonly logBorrowedBook: typeof LogBorrowedBook,
  ) {}

  async loanBook(loanBookDto: LoanBookDto, user) {
    try {
      const { identifier } = loanBookDto;

      const checkBook = await this.checkBook(identifier);

      let checkUser = await this.checkUser(user.email);

      /**
       * If user get penalized
       */
      if (checkUser.penalized === true) {
        let checkedDate = await this.logBorrowedBook.findOne({
          where: {
            userId: user.userId,
          },
        });

        let returnDate = checkedDate.returnedDate.setDate(
          new Date().getDate() + 3,
        );
        console.log({ returnDate });

        let nowDate = new Date().setHours(24, 0, 0, 0);

        if (nowDate < returnDate) {
          throw new ForbiddenException(MemberArePenalizedError);
        }
      }

      if (checkUser.borrowedBook >= 2) {
        throw new ForbiddenException(MemberAlreadyBorrowedTwoBook);
      }

      let book = checkUser.borrowedBook + 1;

      await this.memberRepository.update(
        { borrowedBook: book, penalized: false },
        {
          where: {
            id: user.userId,
          },
        },
      );

      await this.logBorrowedBook.create({
        userId: user.userId,
        bookId: checkBook.id,
        bookCode: checkBook.bookCode,
        expectedReturnDate: new Date().setDate(new Date().getDate() + 7),
      });

      await this.bookRepository.update(
        {
          memberId: user.userId,
          borrowed: true,
          stock: sequelize.literal('stock - 1'),
        },
        {
          where: {
            [Op.or]: [{ title: identifier }, { bookCode: identifier }],
          },
        },
      );

      return {
        ...successConstant,
      };
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async findAll() {
    try {
      let data = await this.bookRepository.findAll({
        where: {
          stock: { [Op.gt]: 0 },
          borrowed: false,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'memberId', 'borrowed'],
        },
      });

      return {
        ...successConstant,
        data,
      };
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async returnBook(returnBook: ReturnBookDto, user) {
    try {
      const { identifier, returnedDate } = returnBook;

      const bookData = await this.checkBook(identifier);

      let userData = await this.checkUser(user.email);

      let logData = await this.logBorrowedBook.findOne({
        where: {
          userId: user.userId,
          bookId: bookData.id,
          returned: false,
        },
      });

      if (!logData) {
        throw new NotFoundException(BookNotBorrowedByUserError);
      }

      const expectedReturn = logData.expectedReturnDate.setHours(24, 0, 0, 0);
      const todayDate = new Date().setHours(24, 0, 0, 0);

      if (expectedReturn > todayDate) {
        await this.memberRepository.update(
          { penalized: true },
          {
            where: {
              email: user.email,
            },
          },
        );
      }

      await this.bookRepository.update(
        {
          memberId: null,
          borrowed: false,
          stock: sequelize.literal('stock + 1'),
        },
        {
          where: {
            [Op.or]: [{ title: identifier }, { bookCode: identifier }],
          },
        },
      );

      await this.memberRepository.update(
        {
          borrowedBook: userData.borrowedBook - 1,
        },
        {
          where: {
            id: user.userId,
          },
        },
      );

      await this.logBorrowedBook.update(
        {
          returnedDate: returnedDate,
          returned: true,
        },
        {
          where: {
            userId: user.userId,
            bookId: bookData.id,
            bookCode: bookData.bookCode,
          },
        },
      );

      return {
        ...successConstant,
      };
    } catch (err) {
      throw new FilterException(err);
    }
  }

  private async checkUser(email) {
    const checkUser = await this.memberRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!checkUser) {
      throw new NotFoundException(MemberNotFoundError);
    }
    return checkUser;
  }

  private async checkBook(identifier) {
    const checkBook = await this.bookRepository.findOne({
      where: {
        // stock: { [Op.gt]: 0 },
        // borrowed: false,
        [Op.or]: [{ title: identifier }, { bookCode: identifier }],
      },
    });

    if (!checkBook) {
      throw new NotFoundException(BookNotExistError);
    }

    return checkBook;
  }
}
