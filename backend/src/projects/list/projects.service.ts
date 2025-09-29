import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DatabaseService } from 'src/database/database/database.service';
import { handlePrismaErrors } from 'src/common/utils/prisma-error.util';

@Injectable()
export class ProjectsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const createProject = await this.dbService.project.create({
        data: createProjectDto,
      });
      return createProject;
    } catch (error) {
      handlePrismaErrors(error, 'create', 'project');
    }
  }

  findAll() {
    return this.dbService.project.findMany({});
  }

  findOne(id: number) {
    return this.dbService.project.findUnique({ where: { id } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const updateProject = await this.dbService.project.update({
        where: { id },
        data: updateProjectDto,
        select: { id: true, fullName: true },
      });
      return updateProject;
    } catch (error) {
      handlePrismaErrors(error, 'update', 'projects');
    }
  }

  async remove(id: number) {
    try {
      const removedProject = await this.dbService.project.delete({
        where: { id },
      });
      return {
        success: true,
        message: `Project with id ${removedProject.id} deleted.`,
      };
    } catch (error) {
      handlePrismaErrors(error, 'delete', 'projects');
    }
  }
}
