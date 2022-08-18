import {Connection} from 'mongoose';
import {DictionarySchema} from 'src/schemas/dictionary.schema';
import {GoodSchema} from 'src/schemas/good.schema';
import {magicalStrings as keys} from '../../../configs/magicalStrings';

export const goodProviders = [
  {
    provide: keys.goodModel,
    useFactory: (conncetion: Connection) =>
      conncetion.model('Good', GoodSchema),
    inject: [keys.databaseConnection],
  },
  {
    provide: keys.dictionaryModel,
    useFactory: (conncetion: Connection) =>
      conncetion.model('Dictionary', DictionarySchema),
    inject: [keys.databaseConnection],
  },
];
