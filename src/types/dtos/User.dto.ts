import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  googleId: string;

  @IsString()
  avatarUrl: string;
}
