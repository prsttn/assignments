import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { userProviders } from './providers/user.provider';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService]
})
export class UserModule {}
