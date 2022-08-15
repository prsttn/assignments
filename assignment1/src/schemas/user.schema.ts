import * as mongoose from 'mongoose';
import { magicalStrings as keys } from '../configs/magicalStrings';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match : new RegExp('^[a-zA-Z0-9-_]+$')
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: [keys.UserRole, keys.AdminRole],
    default: 'User'
  }
})