import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBoqSectionDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sectionCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sectionName: string;

  @ApiProperty()
  @IsString()
  sectionType: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  locationId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  totalAmount: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  currencyId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

// DTO for bulk creation of sections
export class CreateBoqSectionBulkDTO {
  @ApiProperty({ type: [CreateBoqSectionDto] })
  @IsArray()
  @Type(() => CreateBoqSectionDto)
  boqSections: CreateBoqSectionDto[];
}
