
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import configuration from '../../configs/jwtConfig';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().secret,
    });
  }


  async validate(payload: any) {
    let user = await this.authService.validateUser(payload.whoami);
    if(!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return user;
  }
}