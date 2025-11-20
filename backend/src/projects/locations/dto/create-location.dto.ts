import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  locationName: string;

  @IsNumber()
  @IsOptional()
  latitude: number;

  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsString()
  @IsOptional()
  notes: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
