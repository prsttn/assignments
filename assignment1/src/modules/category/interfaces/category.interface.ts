

import { Document } from 'mongoose';

export interface Category extends Document{
  readonly category_name: string;
  readonly parent_category: string;
}