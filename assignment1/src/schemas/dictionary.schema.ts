import * as mongoose from 'mongoose';

export const DictionarySchema = new mongoose.Schema({
  latinName: {
    type: String,
    required: true
  },
  persianName: {
    type: String,
    required: true
  }
})