import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { LoanBookDto } from './dto/loan-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

class ApiServiceMock {
  loanBook(dto: any, user: any) {
    return {};
  }
  findAll() {
    return {};
  }
  returnBook(dto: any, user) {
    return {};
  }
}

const userReq = {
  user: {
    email: 'testemail1@mail.com',
    username: 'testusername',
    userId: '123123123',
  },
};

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: BookService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, ApiServiceProvider],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call loanBook method with expected params', async () => {
    const createLoanBook = jest.spyOn(service, 'loanBook');
    const dto = new LoanBookDto();
    await service.loanBook(dto, userReq.user);
    expect(createLoanBook).toHaveBeenCalledWith(dto, userReq.user);
  });

  it('should call findAll method with expected params', async () => {
    const findAll = jest.spyOn(service, 'findAll');
    await service.findAll();
    expect(findAll).toHaveBeenCalledWith();
  });

  it('should call returnBook method with expected params', async () => {
    const createReturnBook = jest.spyOn(service, 'returnBook');
    const dto = new ReturnBookDto();
    await service.returnBook(dto, userReq.user);
    expect(createReturnBook).toHaveBeenCalledWith(dto, userReq.user);
  });
});
