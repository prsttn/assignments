import { Connection } from 'mongoose';
import { CategorySchema } from 'src/schemas/category.schema';
import { DictionarySchema } from 'src/schemas/dictionary.schema';
import { GoodSchema } from 'src/schemas/good.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { magicalStrings as keys } from '../../../configs/magicalStrings';

export const goodProviders = [{
  provide: keys.goodModel,
  useFactory: (conncetion: Connection) => conncetion.model('Good', GoodSchema),
  inject: [keys.databaseConnection]
}, {
  provide: keys.dictionaryModel,
  useFactory: (conncetion: Connection) => conncetion.model('Dictionary', DictionarySchema),
  inject: [keys.databaseConnection]
}
];