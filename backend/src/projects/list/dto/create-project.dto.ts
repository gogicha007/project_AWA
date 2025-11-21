import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  managerId?: number;

  @ApiProperty()
  @IsString()
  status: ProjectStatus;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  currencyId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
