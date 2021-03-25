import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserParam {
  @ApiProperty({description: 'user id', required: true})
  @IsDefined()
  @IsNotEmpty()
  public id!: string;
}
export class CreateUserDto {
  @ApiProperty({description: 'email', required: true})
  @IsEmail()
  @MinLength(4)
  public email!: string;

  @ApiProperty({description: 'username', required: true})
  @IsString()
  @MinLength(4)
  public name!: string;

  @ApiProperty({description: 'password', required: true})
   @IsString()
  @MinLength(4)
  public password!: string;
}
 
export default CreateUserDto;