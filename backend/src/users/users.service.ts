import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private readonly dbServise: DatabaseService) {}
  async create(payload: CreateUserDto) {
    let user = await this.dbServise.user.findUnique({
      where: { firebaseUid: payload.firebaseUid },
      select: {
        email: true,
        id: true,
      },
    });

    if (!user) {
      user = await this.dbServise.user.create({
        data: payload,
        select: {
          email: true,
          id: true,
        },
      });
    }
    return user;
  }

  async findAll() {
    const allUsers = await this.dbServise.user.findMany({
      select: {
        name: true,
        email: true,
      },
    });
    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.dbServise.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByFBUid(id: string) {
    const user = await this.dbServise.user.findUnique({
      where: { firebaseUid: id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.dbServise.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.dbServise.user.delete({
        where: { id },
        select: { id: true, email: true },
      });

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }
}
