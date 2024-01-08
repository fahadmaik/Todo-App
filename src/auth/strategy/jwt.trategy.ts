import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions';
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key-here',
    });
  }
  async validate(payload: any) {
    return {
      userId: payload.userId,
      firstName: payload.firstName,
      lastname: payload.lastname,
      email: payload.email,
      password: payload.password,
    };
  }
}
