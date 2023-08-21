import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, {message: 'email not in correct format'})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'password length should be at least 6 characters.' })
  readonly password: string;
}
