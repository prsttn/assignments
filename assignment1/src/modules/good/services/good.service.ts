import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import * as mongoose from 'mongoose';
import {magicalStrings as keys} from 'src/configs/magicalStrings';
import {Dictionary} from 'src/modules/dictionary/interfaces/dictionary.interface';
import {AddGoodDto} from '../dtos/addGood.dto';
import {EditGoodDto} from '../dtos/editGood.dto';
import {Good} from '../interfaces/good.interface';
import {GoodTools} from './tools.service';
import {FilterGoodsDto} from '../dtos/filterGoods.dto';

@Injectable()
export class GoodService {
  // Aggregation Pipelines to construct the specific data structures.
  translatedDataReperesentaion: any[];
  categoryRepesentaion: any[];
  englishDataReperesentaion: any[];

  constructor(
    private goodTools: GoodTools,
    @Inject(keys.goodModel) readonly goodModel: Model<Good>,
    @Inject(keys.dictionaryModel) readonly dictionaryModel: Model<Dictionary>,
  ) {
    this.translatedDataReperesentaion = [
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          'category._id': 1,
          'category.category_name': 1,
          'category.parent_category._id': 1,
          'category.parent_category.category_name': 1,
          details: {
            $arrayToObject: {
              $map: {
                input: {$objectToArray: '$details'},
                as: 'd',
                in: {
                  k: {$ifNull: ['$$d.v.translatedKey', '$$d.k']},
                  v: '$$d.v.value',
                },
              },
            },
          },
        },
      },
    ];

    this.categoryRepesentaion = [
      {
        $lookup: {
          from: 'categories',
          as: 'category',
          localField: 'category',
          foreignField: '_id',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $lookup: {
          from: 'categories',
          as: 'category.parent_category',
          localField: 'category.parent_category',
          foreignField: '_id',
        },
      },
      {
        $unwind: '$category.parent_category',
      },
    ];

    this.englishDataReperesentaion = [
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          'category._id': 1,
          'category.category_name': 1,
          'category.parent_category._id': 1,
          'category.parent_category.category_name': 1,
          details: {
            $arrayToObject: {
              $map: {
                input: {$objectToArray: '$details'},
                as: 'd',
                in: {
                  k: '$$d.k',
                  v: '$$d.v.value',
                },
              },
            },
          },
        },
      },
    ];
  }

  async getGoodsList(): Promise<Good[]> {
    const goods = await this.goodModel.aggregate([
      ...this.categoryRepesentaion,
      ...this.translatedDataReperesentaion,
    ]);
    return goods;
  }

  async filterGoodsViaDetails(filters: FilterGoodsDto) {
    // 0. Make filter array
    const query = this.goodTools.makeFilterArrayForQuery(filters);

    // 1. Filter Goods
    const goods = await this.goodModel.aggregate([
      {
        $match: {
          $and: query,
        },
      },
      ...this.categoryRepesentaion,
      ...this.translatedDataReperesentaion,
    ]);

    return goods;
  }

  async getOriginalGoodById(_id: string): Promise<any> {
    const result = await this.goodModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id),
        },
      },
      ...this.categoryRepesentaion,
      ...this.englishDataReperesentaion,
    ]);
    return result[0];
  }

  async getTranslatedGoodById(_id: string): Promise<any> {
    const result = await this.goodModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id),
        },
      },
      ...this.categoryRepesentaion,
      ...this.translatedDataReperesentaion,
    ]);
    return result[0];
  }

  async addGood(addGooddto: AddGoodDto): Promise<Good> {
    // 0. Convert recieved datials object to map
    addGooddto.details = new Map(Object.entries(addGooddto.details));

    // 1. Construct the details based on GoodDetail schema.
    if (addGooddto.details) {
      addGooddto.details = await this.goodTools.constructGoodDetails(
        addGooddto.details,
      );
    }
    // 2. create new good
    const good = new this.goodModel(addGooddto);
    return await good.save();
  }

  async editGood(editGoodDto: EditGoodDto): Promise<Good> {
    // 0. Convert recieved datials object to map
    editGoodDto.details = new Map(Object.entries(editGoodDto.details));

    // 1. Construct the details based on GoodDetail schema.
    if (editGoodDto.details) {
      editGoodDto.details = await this.goodTools.constructGoodDetails(
        editGoodDto.details,
      );
    }

    // 2. create new good
    const good = await this.goodModel.findByIdAndUpdate(
      editGoodDto._id,
      {$set: editGoodDto},
      {new: true},
    );
    return good;
  }

  async deleteGoodById(_id: string): Promise<any> {
    const result = await this.goodModel.findByIdAndDelete(_id);
    return result;
  }

  async countGoodsByCategory(): Promise<any> {
    const stats = await this.goodModel.aggregate([
      {$sortByCount: '$category'},
      {
        $lookup: {
          from: 'categories',
          as: '_id',
          localField: '_id',
          foreignField: '_id',
        },
      },
      {
        $project: {
          _id: {$first: '$_id.category_name'},
          count: 1,
        },
      },
    ]);

    /*


    const stats_v2 = await this.goodModel.aggregate().sortByCount('category')
    .lookup({from: 'categories', as: '_id', localField: '_id', foreignField: '_id'})
    .project({_id: {$first :'$_id.category_name'}, count: 1});
    
    
    */

    return stats;
  }
}
