import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CurrencyDTO } from '../dto/currency.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CurrencyService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: CurrencyDTO) {
    const createCurrency = await this.dbService.currency.create({
      data: payload,
      select: {
        code: true,
      },
    });
    return createCurrency;
  }

  async findAll() {
    const allGroups = await this.dbService.currency.findMany({
      select: {
        id: true,
        code: true,
      },
    });
    return allGroups;
  }

  async update(id: number, updateCurrency: CurrencyDTO) {
    try {
      const currency = await this.dbService.currency.update({
        where: { id },
        data: updateCurrency,
        select: {
          id: true,
          code: true,
        },
      });
      return currency;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Unit with ID ${id} not found`);
      }
      throw error;
    }
  }
  async remove(id: number) {
    try {
      const currency = await this.dbService.currency.delete({
        where: { id },
        select: { id: true, code: true },
      });
      return currency;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Currency with ID ${id} not found`);
      }
      throw error;
    }
  }
}
