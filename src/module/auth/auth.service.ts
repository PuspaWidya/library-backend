import { Injectable } from '@nestjs/common';
import { comparePass } from 'src/common/hashService';
import { MemberService } from '../member/member.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let user = await this.memberService.findOne(email);
    const compare = await comparePass(pass, user.password);

    if (user && compare) {
      user = JSON.parse(JSON.stringify(user));
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    /**
     * payload will become jwt (1)
     */

    const payload = {
      name: user.name,
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
