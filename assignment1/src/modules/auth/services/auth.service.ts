import {Injectable} from '@nestjs/common';
import {UserService} from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import {User} from 'src/modules/user/interfaces/user.interface';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // validation function for local strategy
  async validateUserPass(username: string, pass: string): Promise<any> {
    // 0. find user by username
    const user = await this.userService.findUserByUsername(username);

    // 1. return user data if user exists and password is valid
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const {password, ...result} = user.toObject();
        return result;
      }
    }

    // 2. return null if username or password are invalid
    return null;
  }

  // validation function for jwt strategy
  async validateUser(id: string): Promise<User> {
    // 0. find user by id
    const user = await this.userService.findUserById(id);
    return user;
  }

  // make jwt token for user
  async assignToken(user: User) {
    const payload = {whoami: user._id};
    const token = this.jwtService.sign(payload);
    return token;
  }
}
