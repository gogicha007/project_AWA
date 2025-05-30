import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class VendorsDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
