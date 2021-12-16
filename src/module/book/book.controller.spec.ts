import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { LoanBookDto } from './dto/loan-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

describe('BookController', () => {
  let controller: BookController;
  let spyService: BookService;

  const userReq = {
    user: {
      email: 'testemail1@mail.com',
      username: 'testusername',
      userId: '123123123',
    },
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: BookService,
      useFactory: () => ({
        loanBook: jest.fn(() => {}),
        returnBook: jest.fn(() => {}),
        findAll: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, ApiServiceProvider],
    }).compile();

    controller = module.get<BookController>(BookController);
    spyService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling loanBook method', async () => {
    const dto = new LoanBookDto();
    dto.identifier = 'bookTitle';
    await controller.loanBook(dto, userReq);

    expect(spyService.loanBook).toHaveBeenCalled();
    expect(spyService.loanBook).toHaveBeenCalledWith(dto, userReq.user);
    expect(spyService.loanBook(dto, userReq.user)).not.toEqual(null);
  });

  it('calling returnBook method', async () => {
    const dto = new ReturnBookDto();
    dto.identifier = 'bookTitle';
    await controller.returnBook(dto, userReq);

    expect(spyService.returnBook).toHaveBeenCalled();
    expect(spyService.returnBook).toHaveBeenCalledWith(dto, userReq.user);
    expect(spyService.returnBook(dto, userReq.user)).not.toEqual(null);
  });

  it('calling findAll Book method', async () => {
    await controller.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
    expect(spyService.findAll).toHaveBeenCalledWith();
    expect(spyService.findAll).not.toEqual(null);
  });
});
