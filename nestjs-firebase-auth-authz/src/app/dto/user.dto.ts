import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDTO {
 
  @ApiProperty({ description: 'displayName'})
  @IsString()
  @MinLength(4)
  displayName: string;

  @ApiProperty({ description: 'email'})
  @IsString()
  @IsEmail()
  email: string;

   @ApiProperty({ description: 'password'})
   @IsString()
   @MinLength(8)
   password: string;

  @ApiProperty({ description: 'role'})
  @IsString()
  @MinLength(4)
   role: string;

}