import {Module} from '@nestjs/common';
import {DictionaryService} from './services/dictionary.service';
import {DictionaryController} from './controllers/dictionary.controller';
import {dictionaryProviders} from './providers/dictionary.provider';

@Module({
  providers: [DictionaryService, ...dictionaryProviders],
  controllers: [DictionaryController],
})
export class DictionaryModule {}
