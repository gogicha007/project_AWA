import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoqSectionBulkDTO } from './dto/create-boq-section.dto';
import { UpdateBoqSectionDto } from './dto/update-boq-section.dto';
import { DatabaseService } from 'src/database/database/database.service';
import { handlePrismaErrors } from 'src/common/utils/prisma-error.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DeleteOperationResult } from 'src/common/types/operation-result_types';

@Injectable()
export class BoqSectionsService {
  constructor(private readonly dbService: DatabaseService) {}

  async upsertBoqSections(boqSectionsData: CreateBoqSectionBulkDTO) {
    try {
      return await this.dbService.$transaction(async () => {
        const upsertedBoqSections: Array<
          Awaited<ReturnType<typeof this.dbService.projectSection.upsert>>
        > = [];

        for (const sectionData of boqSectionsData.boqSections) {
          const { id, currencyId, ...otherFields } = sectionData;

          const processedData = {
            ...otherFields,
            currencyId: currencyId === 0 ? null : currencyId,
          };

          const upsertedSection = await this.dbService.projectSection.upsert({
            where: { id: id || 0 },
            create: { ...processedData },
            update: { ...processedData },
          });
          if (upsertedSection) upsertedBoqSections.push(upsertedSection);
        }
        return upsertedBoqSections;
      });
    } catch (error) {
      handlePrismaErrors(error, 'upsert', 'projectSection');
    }
  }

  async findAll() {
    return this.dbService.projectSection.findMany();
  }

  async findOne(id: number) {
    const section = await this.dbService.projectSection.findUnique({
      where: { id },
    });
    if (!section) {
      throw new NotFoundException(`Boq Section with ID ${id} not found`);
    }
    return section;
  }

  async update(id: number, updateBoqSectionDto: UpdateBoqSectionDto) {
    try {
      const { currencyId, ...otherFields } = updateBoqSectionDto;

      const processedData = {
        ...otherFields,
        ...(currencyId !== undefined && {
          currencyId: currencyId === 0 ? null : currencyId,
        }),
      };

      const updateBoqSection = this.dbService.freight.update({
        where: { id },
        data: processedData,
      });
      return updateBoqSection;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Shipment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return this.dbService.projectSection.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Shipment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async removeByIdsArray(sectionIdsArr: number[]) {
    try {
      const resultsArr: DeleteOperationResult[] = [];

      if (sectionIdsArr.length > 0) {
        const resultRemovedFreights = await this.dbService.freight.deleteMany({
          where: { id: { in: sectionIdsArr } },
        });
        resultsArr.push({
          success: true,
          deletedCount: resultRemovedFreights.count,
          message: `Deleted ${resultRemovedFreights.count} freights`,
        });
      }
      return resultsArr;
    } catch (error) {
      handlePrismaErrors(error, 'update', 'Boq Section');
    }
  }
}
