import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
