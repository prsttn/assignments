import {IsNotEmpty, IsString} from 'class-validator';

export class AddWordDto {
  @IsString()
  @IsNotEmpty()
  latinName: string;

  @IsString()
  @IsNotEmpty()
  persianName: string;
}
