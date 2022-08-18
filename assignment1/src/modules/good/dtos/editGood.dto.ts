import {IsNotEmpty, IsString} from 'class-validator';

export class EditGoodDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  details: Map<string, any>;

  @IsString()
  @IsNotEmpty()
  category: string;
}
