import { IsString, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Matches(new RegExp('^[a-zA-Z0-9-_]+$'))
  username: string;

  @IsString()
  @Matches(new RegExp('^[a-zA-Z0-9-_]+$'))
  password: string;
}