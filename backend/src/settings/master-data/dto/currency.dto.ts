import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CurrencyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
  name: string;
}
