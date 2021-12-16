import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  getAllMemberSwagger,
  loanBookDescriptionSwagger,
  returnBookSwagger,
} from 'src/common/swaggerDescription';
import { BookService } from './book.service';
import { LoanBookDto } from './dto/loan-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@ApiTags('Book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    description: loanBookDescriptionSwagger,
  })
  @Post()
  loanBook(@Body() loanBook: LoanBookDto, @Request() req: any) {
    return this.bookService.loanBook(loanBook, req.user);
  }

  @ApiOperation({
    description: returnBookSwagger,
  })
  @Patch()
  returnBook(@Body() returnBook: ReturnBookDto, @Request() req: any) {
    return this.bookService.returnBook(returnBook, req.user);
  }

  @ApiOperation({
    description: getAllMemberSwagger,
  })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }
}
