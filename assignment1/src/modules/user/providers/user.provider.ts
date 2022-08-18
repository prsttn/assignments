import {Connection} from 'mongoose';
import {CategorySchema} from 'src/schemas/category.schema';
import {UserSchema} from 'src/schemas/user.schema';
import {magicalStrings as keys} from '../../../configs/magicalStrings';

export const userProviders = [
  {
    provide: keys.userModel,
    useFactory: (conncetion: Connection) =>
      conncetion.model('User', UserSchema),
    inject: [keys.databaseConnection],
  },
  {
    provide: keys.categoryModel,
    useFactory: (conncetion: Connection) =>
      conncetion.model('Category', CategorySchema),
    inject: [keys.databaseConnection],
  },
];
