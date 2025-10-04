import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
import { CreateServicioInput, UpdateServicioInput } from './servicio.input';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio) private readonly repo: Repository<Servicio>,
  ) {}

  async findByAdmin(adminId: number): Promise<Servicio[]> {
    return this.repo.find({
      where: { adminId, activo: true },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Servicio> {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    return s;
  }

  async create(data: CreateServicioInput): Promise<Servicio> {
    const s = this.repo.create(data);
    return this.repo.save(s);
  }

  async update(id: number, data: UpdateServicioInput): Promise<Servicio> {
    const s = await this.findOne(id);
    Object.assign(s, data);
    return this.repo.save(s);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}
