import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBoqItemDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  sectionId: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  breakdownId: number;

  @ApiProperty({ required: true })
  @IsString()
  itemNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  materialId: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  unitId: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  quantity: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  unitPrice: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  totalPrice: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  parentItemId: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  level: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  itemType: string;

  @ApiProperty({ required: true })
  @IsInt()
  userId: number;
}
