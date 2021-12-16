import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { checkHealth, loginMemberSwagger } from './common/swaggerDescription';
import { Public } from './decorators/public.decorator';
import { AuthService } from './module/auth/auth.service';
import { LocalAuthGuard } from './module/auth/local-auth.guard';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    description: checkHealth,
  })
  @Public()
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  /**
   *
   * @param req
   * @returns
   *
   * after password being checked from localAuthGuard
   * request from localAuthGuard are userData from member
   * it will produce access_token jwt
   */

  @ApiOperation({
    description: loginMemberSwagger,
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
