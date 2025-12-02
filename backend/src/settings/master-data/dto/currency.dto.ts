import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CurrencyCode } from '@prisma/client';

export class CurrencyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: CurrencyCode;
  name: string;
}
