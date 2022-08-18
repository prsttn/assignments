import * as mongoose from 'mongoose';

const detailSchema = new mongoose.Schema(
  {
    value: {
      type: mongoose.Schema.Types.Mixed,
    },
    translatedKey: {
      type: String,
      default: null,
    },
  },
  {_id: false},
);

export const GoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: Map,
    of: detailSchema,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
