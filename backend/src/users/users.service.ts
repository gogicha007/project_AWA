import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/dadabase/database.service';

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
