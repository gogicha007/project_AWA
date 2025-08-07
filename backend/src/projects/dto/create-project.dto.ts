import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  managerId: number;

  @ApiProperty()
  @IsString()
  progress: string;

  @ApiProperty()
  @IsNumber()
  notes: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsNumber()
  currencyId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
