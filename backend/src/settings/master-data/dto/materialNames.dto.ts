import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class MaterialNameDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pn: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  degree: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  typeId: number;
}
