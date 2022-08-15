import { Inject, Injectable } from '@nestjs/common';
import { magicalStrings as keys} from 'src/configs/magicalStrings';
import configuration from '../../../configs/config';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { User } from '../interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt  from 'bcrypt';

@Injectable()
export class UserService {
  config: any;
  constructor(@Inject(keys.userModel) private userModel: Model<User>) {
    this.config = configuration();
  }
 
  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    // 0. hash user password
    registerUserDto.password =  await bcrypt.hash(registerUserDto.password, this.config.saltOrRounds);

    // 1. Create user
    const user = new this.userModel(registerUserDto);
    return user.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({username});
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findOne({_id: id});
  }
}
