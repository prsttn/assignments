import {Inject, Injectable} from '@nestjs/common';
import {magicalStrings as keys} from './configs/magicalStrings';
import {Model} from 'mongoose';
import {User} from 'src/modules/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import configuration from './configs/config';
import {Role} from './enums/role.enum';
@Injectable()
export class AppService {
  config: any;
  constructor(@Inject(keys.userModel) private userModel: Model<User>) {
    this.config = configuration();
  }

  async createAdminUser(): Promise<boolean> {
    const admin = await this.userModel.findOne({
      username: this.config.adminUsername,
    });
    if (!admin) {
      const hash = await bcrypt.hash(
        this.config.adminPass,
        this.config.saltOrRounds,
      );
      const user = new this.userModel({
        username: this.config.adminUsername,
        password: hash,
        role: Role.Admin,
      });
      await user.save();
      console.log('Create Admin Successfully');
    }
    return true;
  }
}
