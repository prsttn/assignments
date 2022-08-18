import {Module} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import {LocalStrategy} from './local.strategy';
import {AuthService} from './services/auth.service';
import {AuthController} from './controllers/auth.controller';
import {JwtService} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.starategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
