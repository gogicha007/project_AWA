import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { CurrencyDTO } from '../dto/currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  create(@Body() currencyDTO: CurrencyDTO) {
    return this.currencyService.create(currencyDTO);
  }

  @Get()
  findAll() {
    return this.currencyService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCurrencyDTO: CurrencyDTO) {
    return this.currencyService.update(+id, updateCurrencyDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.currencyService.remove(+id);
  }
}
