import { IsNotEmpty, IsString } from "class-validator";


export class AddWordDto {
  @IsString()
  @IsNotEmpty()
  latinName: String;

  @IsString()
  @IsNotEmpty()
  persianName: String;
}