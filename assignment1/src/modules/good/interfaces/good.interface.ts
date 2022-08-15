
import { Document } from 'mongoose';

export interface GoodDetails {
  readonly key: string;
  readonly value: any;
  readonly translatedKey: String;
}

interface Category {
  readonly _id: string;
  readonly category_name: string;
  readonly parent: Category;
}

export interface Good extends Document {
  readonly name: string;
  readonly details: Map<String, GoodDetails>;
  readonly category: Category;
  readonly image: string;
  readonly price: number;
}

