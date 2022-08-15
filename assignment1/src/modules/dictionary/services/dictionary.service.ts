import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { magicalStrings as keys} from 'src/configs/magicalStrings';
import { AddWordDto } from '../dtos/dictionary.dto';
import { Dictionary } from '../interfaces/dictionary.interface';

@Injectable()
export class DictionaryService {
  constructor(@Inject(keys.dictionaryModel) private dictionaryModel: Model<Dictionary>) {}

  async addWord(addWordDto: AddWordDto[]) {
    const result = await this.dictionaryModel.insertMany(addWordDto);
    return result;
  }

  async getWordsList(): Promise<Dictionary[]> {
    const words = await this.dictionaryModel.find({}).select(['latinName', 'persianName']);
    return words;
  }
}
