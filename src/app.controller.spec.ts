import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Member } from './entities/member.entity';
import { AuthModule } from './module/auth/auth.module';
import { AuthService } from './module/auth/auth.service';
import { BookModule } from './module/book/book.module';
import { BookService } from './module/book/book.service';
import { MemberModule } from './module/member/member.module';
import { MemberService } from './module/member/member.service';

describe('AppController', () => {
  let appController: AppController;
  let spyService: AppService;
  let authService: AuthService;

  const userReq = {
    user: {
      email: 'testemail1@mail.com',
      username: 'testusername',
      userId: '123123123',
    },
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AppService,
      useFactory: () => ({
        getHello: jest.fn(() => {}),
      }),
    };

    const AuthServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => {}),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ApiServiceProvider, AuthServiceProvider],
    }).compile();

    appController = app.get<AppController>(AppController);
    spyService = app.get<AppService>(AppService);
    authService = app.get<AuthService>(AuthService);
  });

  it('app controller should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('calling getHello method', async () => {
    await appController.getHello();
    expect(spyService.getHello).toHaveBeenCalled();
    expect(spyService.getHello).toHaveBeenCalledWith();
    expect(spyService.getHello).not.toEqual(null);
  });

  it('calling login method', async () => {
    await appController.login(userReq.user);
    expect(authService.login).toHaveBeenCalled();
    expect(authService.login(userReq.user)).not.toEqual(null);
  });
});
