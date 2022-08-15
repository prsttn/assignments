import { IsNumber } from "class-validator";

export class FilterGoodsDto {
  details: any;

  @IsNumber()
  minPrice: number;

  @IsNumber()
  maxPrice: number;
}