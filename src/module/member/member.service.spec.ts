import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Member } from 'src/entities/member.entity';
import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;
  let findAll: jest.Mock;
  let findOne: jest.Mock;
  let create: jest.Mock;

  const createMemberMock = {
    name: 'test123123',
    email: 'test123@mail.com',
    password: 'test123123',
    username: 'test1231231',
  };

  beforeEach(async () => {
    findAll = jest.fn();
    findOne = jest.fn();
    create = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getModelToken(Member),
          useValue: { findAll, findOne, create },
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should get member list', () => {
    beforeEach(() => {
      findAll.mockReturnValue([{}]);
      findOne.mockReturnValue(null);
    });
    it('should return success and allMember list', async () => {
      const data = await service.findAll();
      expect(data).toEqual({
        errorCode: 0,
        message: 'Success',
        allMember: [{}],
      });
    });
  });

  describe('should create member', () => {
    beforeEach(() => {
      findOne.mockImplementation(() => Promise.resolve(null));
      create.mockImplementation(() => Promise.resolve({ name: 'asds' }));
    });
    it('should create member and return success constant', async () => {
      const data = await service.create(createMemberMock);
      expect(data).toEqual({
        errorCode: 0,
        message: 'Success',
      });
    });
  });
});
