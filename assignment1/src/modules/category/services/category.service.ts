import {Injectable, Inject, Body} from '@nestjs/common';
import {Model} from 'mongoose';
import {magicalStrings as keys} from 'src/configs/magicalStrings';
import {CreateCategoryDto} from '../dtos/createCategory.dto';
import {Category} from '../interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(keys.categoryModel) private categoryModel: Model<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.aggregate([
      {
        $match: {
          parent_category: null,
        },
      },
      {
        $lookup: {
          from: 'categories',
          as: 'childs',
          localField: '_id',
          foreignField: 'parent_category',
        },
      },
      {
        $project: {
          _id: 1,
          category_name: 1,
          'childs._id': 1,
          'childs.category_name': 1,
        },
      },
    ]);
    return categories;
  }

  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }
}
