import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async create(data: Partial<Admin>): Promise<Admin> {
    const admin = this.adminRepo.create(data);
    return this.adminRepo.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepo.find({ relations: ['eventos'] });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({
      where: { id },
      relations: ['eventos'],
    });
    if (!admin) throw new NotFoundException(`Admin con id ${id} no existe`);
    return admin;
  }

  async update(id: number, data: Partial<Admin>): Promise<Admin> {
    await this.adminRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.adminRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Admin con id ${id} no existe`);
    }
  }
}
