import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException, Dependencies} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {User} from '../user/interfaces/user.interface';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    this.authService = authService;
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUserPass(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return <User>user;
  }
}
