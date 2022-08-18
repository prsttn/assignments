import {IsNotEmpty, IsString} from 'class-validator';

export class AddGoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  details: Map<string, any>;

  @IsString()
  @IsNotEmpty()
  category: string;
}
