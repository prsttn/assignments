import { Connection } from 'mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { magicalStrings as keys } from 'src/configs/magicalStrings';

export const appProviders = [{
  provide: keys.userModel,
  useFactory: (conncetion: Connection) => conncetion.model('User', UserSchema),
  inject: [keys.databaseConnection]
}]