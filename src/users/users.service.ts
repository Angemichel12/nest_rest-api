import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.employee.findMany();
  }
  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id },
    });
  }
  async create(createUserDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createUserDto,
    });
  }
  async update(id: number, updatedUserDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updatedUserDto,
    });
  }
  async delete(id: number) {
    return this.databaseService.employee.delete({ where: { id } });
  }
}
