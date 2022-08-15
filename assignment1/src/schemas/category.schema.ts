import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String
  },
  
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }
})