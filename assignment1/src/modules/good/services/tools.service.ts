import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { magicalStrings as keys} from 'src/configs/magicalStrings';
import { Dictionary } from 'src/modules/dictionary/interfaces/dictionary.interface';
import { FilterGoodsDto } from '../dtos/filterGoods.dto';
import { GoodDetails } from '../interfaces/good.interface';

@Injectable()
export class GoodTools {
  constructor( @Inject(keys.dictionaryModel) readonly dictionaryModel: Model<Dictionary>){}

  async constructGoodDetails(details: Map<string, any>): Promise<Map<string, GoodDetails>>{
    let word, finalDetails = new Map();
    // 0. Make an array from details keys
    const keys: string[] = Array.from(details.keys());
    
    // 1. Find translation of keys in deictionary collection
    const dictionary = await this.dictionaryModel.find({latinName: {$in: keys}});

    // 2. Construct details based on GoodDetail Schema
    for( let key of keys) {
      // 2.1 Find key translation in dictionary
      word = dictionary.find((word) =>  key === word.latinName)
      if (!word) word = {latinName: key, persianName: null};

      // 2.2 Add key data to  
      finalDetails.set( word.latinName, {
          value: details.get(word.latinName),
          translatedKey: word.persianName
      });
    }

    return finalDetails;
  }

  makeFilterArrayForQuery(filters: FilterGoodsDto): any[]{
    let query: any[] = [], key: string;
    for(let filterKey in filters.details) {
      key = `details.${filterKey}.value`;
      query.push({
        [key]: filters.details[filterKey]  
      })
    }
    if(filters.minPrice) query.push({price:{ '$gte': filters.minPrice}});
    if (filters.maxPrice) query.push({price:{ '$lte': filters.maxPrice}});
    
    return query;
  }
}