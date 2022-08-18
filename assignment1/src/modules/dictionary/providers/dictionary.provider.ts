import {Connection} from 'mongoose';
import {DictionarySchema} from 'src/schemas/dictionary.schema';
import {magicalStrings as keys} from '../../../configs/magicalStrings';

export const dictionaryProviders = [
  {
    provide: keys.dictionaryModel,
    useFactory: (conncetion: Connection) =>
      conncetion.model('Dictionary', DictionarySchema),
    inject: [keys.databaseConnection],
  },
];
