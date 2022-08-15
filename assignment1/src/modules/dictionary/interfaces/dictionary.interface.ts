import { Document } from "mongoose";

export interface Dictionary extends Document {
  readonly persianName: string;
  readonly latinName: string;
}