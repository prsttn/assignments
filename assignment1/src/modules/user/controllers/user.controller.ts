import { Body, Controller, Post, Put } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register') 
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto)
  }
 
  
}
