import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

describe('MemberController', () => {
  let controller: MemberController;
  let spyService: MemberService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: MemberService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findAll: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService, ApiServiceProvider],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    spyService = module.get<MemberService>(MemberService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create member method', async () => {
    const dto = new CreateMemberDto();
    dto.email = 'testmail1@mail.com';
    dto.username = 'testusername1';
    dto.password = 'testpassword';
    dto.name = 'testname1';

    await controller.create(dto);

    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
    expect(spyService.create(dto)).not.toEqual(null);
  });

  it('calling findAll member method', async () => {
    await controller.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
    expect(spyService.findAll).toHaveBeenCalledWith();
    expect(spyService.findAll).not.toEqual(null);
  });
});
