import * as mongoose from 'mongoose';
import {magicalStrings as keys} from '../../../configs/magicalStrings';
import dbConfig from '../../../configs/database';
export const databaseProviders = [
  {
    provide: keys.databaseConnection,
    useFactory: (): Promise<typeof mongoose> => {
      return mongoose.connect(dbConfig().connectionURL);
    },
  },
];
