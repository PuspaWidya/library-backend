import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './module/member/member.module';
import { BookModule } from './module/book/book.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Member } from './entities/member.entity';
import { Book } from './entities/book.entity';
import { AuthModule } from './module/auth/auth.module';
import LogBorrowedBook from './entities/logBorrowedBook.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.DATEBASE_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Member, Book, LogBorrowedBook],
      synchronize: true,
      autoLoadModels: true,
    }),
    AuthModule,
    JwtModule.register({}),
    MemberModule,
    BookModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
