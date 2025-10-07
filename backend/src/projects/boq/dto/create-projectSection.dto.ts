import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectSectionDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sectionCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sectionName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sectionType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  locationId?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
