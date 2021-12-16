import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: 'secret',
      secretOrKey: process.env.JWT_SECRETKEY,
      // secretOrKey: configService.get<any>('JWT_SECRETKEY'),
    });
  }

  /**
   *
   * @param payload
   * @returns
   *
   * payload from jwt will be validate in here(2)
   */
  async validate(payload: any) {
    return { userId: payload.id, username: payload.name, email: payload.email };
  }
}
