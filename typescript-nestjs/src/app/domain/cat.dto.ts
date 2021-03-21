import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type as ValidateType } from 'class-transformer';


export class Address {
  @ApiProperty({description:"", required: true})
  @IsString()
  readonly city: string;

  @ApiProperty({description:"", required: true})
  @IsString()
  readonly state: number; 
}

// tslint:disable-next-line:max-classes-per-file
export class CreateCatDto {
  @ApiProperty({description:"", required: true})
  @IsString()
  readonly name: string;

  @ApiProperty({description:"", required: true})
  @IsInt()
  readonly age: number;

  @ApiProperty({description:"", required: true})
  @IsString()
  readonly breed: string;

  @ApiProperty({description:"address", required: true, type: [Address]})
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @ValidateType(() => Address)
  public address?: Address [];
}


// tslint:disable-next-line:max-classes-per-file
export class GetCatByIdParam {
  @ApiProperty({description:"", required: true})
  @IsUUID()
  readonly id!: string;
}