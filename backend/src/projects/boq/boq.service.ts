// backend/src/projects/boq/boq.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import * as XLSX from 'node-xlsx';
import { parse as csvParse } from 'csv-parse/sync';
import { Prisma } from 'generated/prisma';
import { CreateProjectSectionDto } from './dto/create-projectSection.dto';
import { UpdateProjectSectionDto } from './dto/update-projectSection.dto';
import { UpdateBoqItemDto } from './dto/update-boqItem.dto';
import { CreateBoqItemDto } from './dto/create-boqItem.dto';

type PrismaTransaction = Prisma.TransactionClient;

@Injectable()
export class BoqService {
  constructor(private readonly db: DatabaseService) {}

  async importBoqFromFile(
    projectId: number,
    file: Express.Multer.File,
    options: ImportOptions,
  ) {
    const data = this.parseFile(file);
    const project = await this.db.project.findUnique({
      where: { id: projectId },
      select: { boqStructureType: true },
    });

    const parser = this.getParserByType(
      project?.boqStructureType || 'hierarchical',
    );
    const structuredData = parser.parse(data, options);

    return this.db.$transaction(async (tx) => {
      for (const sectionData of structuredData.sections) {
        const section = await tx.projectSection.create({
          data: {
            projectId,
            sectionCode: sectionData.code,
            sectionName: sectionData.name,
            sectionType: sectionData.type ?? '',
            totalAmount: sectionData.totalAmount,
            locationId: sectionData.locationId,
            userId: options.userId,
          },
        });

        // Create items for this section
        await this.createItemsRecursively(
          tx,
          section.id,
          sectionData.items,
          null,
          0,
          options.userId,
        );
      }

      // Create breakdowns if any
      for (const breakdownData of structuredData.breakdowns || []) {
        const breakdown = await tx.boqBreakdown.create({
          data: {
            code: breakdownData.code,
            name: breakdownData.name,
            description: breakdownData.description,
            userId: options.userId,
          },
        });

        await this.createItemsRecursively(
          tx,
          null,
          breakdownData.items,
          null,
          0,
          options.userId,
          breakdown.id,
        );
      }
    });
  }

  private parseFile(file: Express.Multer.File): any[][] {
    if (file.originalname.endsWith('.csv')) {
      const csvData = file.buffer.toString('utf-8');
      return csvParse(csvData, { skip_empty_lines: true });
    } else if (file.originalname.match(/\.(xlsx|xls)$/)) {
      const workbook = XLSX.parse(file.buffer);
      return workbook[0]?.data || [];
    }
    throw new Error('Unsupported file format');
  }

  private getParserByType(structureType: string) {
    switch (structureType) {
      case 'hierarchical':
        return new HierarchicalBoqParser();
      case 'sequential':
        return new SequentialBoqParser();
      case 'alphanumeric':
        return new AlphanumericBoqParser();
      default:
        return new HierarchicalBoqParser();
    }
  }

  private async createItemsRecursively(
    tx: PrismaTransaction,
    sectionId: number | null,
    items: ParsedBoqItem[],
    parentId: number | null,
    level: number,
    userId: number,
    breakdownId?: number,
  ) {
    for (const item of items) {
      const createdItem = await tx.boqItem.create({
        data: {
          sectionId,
          breakdownId,
          itemNumber: item.itemNumber,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          parentItemId: parentId,
          level,
          itemType: item.itemType,
          materialId: item.materialId,
          unitId: item.unitId,
          userId,
        },
      });

      if (item.children?.length) {
        await this.createItemsRecursively(
          tx,
          sectionId,
          item.children,
          createdItem.id,
          level + 1,
          userId,
          breakdownId,
        );
      }
    }
  }

  getProjectSections(projectId: number) {
    return this.db.projectSection.findMany({
      where: { projectId },
    });
  }

  createProjectSection(
    projectId: number,
    createSectionDto: CreateProjectSectionDto,
  ) {
    console.log(projectId);
    return this.db.projectSection.create({
      data: {
        ...createSectionDto,
      },
    });
  }

  updateProjectSection(
    sectionId: number,
    updateSectionDto: UpdateProjectSectionDto,
  ) {
    return this.db.projectSection.update({
      where: { id: sectionId },
      data: updateSectionDto,
    });
  }

  deleteProjectSection(sectionId: number) {
    return this.db.projectSection.delete({
      where: { id: sectionId },
    });
  }

  getBoqItems(
    projectId: number,
    filters: { sectionId?: number; breakdownId?: number },
  ) {
    return this.db.boqItem.findMany({
      where: {
        section: { projectId },
        ...filters,
      },
    });
  }
  createBoqItem(projectId: number, createItemDto: CreateBoqItemDto) {
    console.log(projectId);
    return this.db.boqItem.create({
      data: {
        ...createItemDto,
      },
    });
  }
  updateBoqItem(itemId: number, updateItemDto: UpdateBoqItemDto) {
    return this.db.boqItem.update({
      where: { id: itemId },
      data: updateItemDto,
    });
  }
  deleteBoqItem(itemId: number) {
    return this.db.boqItem.delete({
      where: { id: itemId },
    });
  }

  exportBoq(projectId: number, format: string) {
    console.log(projectId, format);
  }
}

// Parser interfaces and classes
export interface ImportOptions {
  userId: number;
  skipEmptyRows: boolean;
  headerRow: number;
  mapping: {
    itemNumber: number;
    description: number;
    unit: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  };
}

interface ParsedBoqItem {
  itemNumber: string;
  description: string;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  itemType?: string;
  materialId?: number;
  unitId?: number;
  children?: ParsedBoqItem[];
}

interface ParsedBoqStructure {
  sections: {
    code: string;
    name: string;
    type?: string;
    totalAmount?: number;
    locationId?: number;
    items: ParsedBoqItem[];
  }[];
  breakdowns?: {
    code: string;
    name: string;
    description?: string;
    items: ParsedBoqItem[];
  }[];
}

class HierarchicalBoqParser {
  parse(data: string[][], options: ImportOptions): ParsedBoqStructure {
    // Implementation for hierarchical parsing (1.1.1 style)
    // This would analyze the item numbers to build the hierarchy
    return this.buildHierarchicalStructure(data, options);
  }

  private buildHierarchicalStructure(
    data: string[][],
    options: ImportOptions,
  ): ParsedBoqStructure {
    console.log(data, options);
    // Dummy implementation for demonstration
    return { sections: [], breakdowns: [] };
  }
}

class SequentialBoqParser {
  parse(data: string[][], options: ImportOptions): ParsedBoqStructure {
    // Implementation for sequential parsing (1, 2, 3 style)
    return this.buildSequentialStructure(data, options);
  }
  private buildSequentialStructure(
    data: string[][],
    options: ImportOptions,
  ): ParsedBoqStructure {
    console.log(data, options);
    // Dummy implementation for demonstration

    return { sections: [], breakdowns: [] };
  }
}

class AlphanumericBoqParser {
  parse(data: any[][], options: ImportOptions): ParsedBoqStructure {
    // Implementation for alphanumeric parsing (A1, A2, B1 style)
    return this.buildAlphanumericStructure(data, options);
  }
  private buildAlphanumericStructure(
    data: string[][],
    options: ImportOptions,
  ): ParsedBoqStructure {
    console.log(data, options);
    // Dummy implementation for demonstration
    return { sections: [], breakdowns: [] };
  }
}
