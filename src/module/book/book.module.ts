import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from 'src/entities/book.entity';
import { Member } from 'src/entities/member.entity';
import LogBorrowedBook from 'src/entities/logBorrowedBook.entity';

@Module({
  imports: [SequelizeModule.forFeature([Book, Member, LogBorrowedBook])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
