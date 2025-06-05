import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateShipmentFileDto {
  @ApiProperty()
  @IsInt()
  shipmentId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty()
  @IsString()
  fileType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileData: string; // base64 encoded file data
}