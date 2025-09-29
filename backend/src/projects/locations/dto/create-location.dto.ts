import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  locationName: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  notes: string;
}
