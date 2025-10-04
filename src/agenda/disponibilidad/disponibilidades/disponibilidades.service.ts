import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disponibilidad } from 'src/agenda/evento/entities/disponibilidad.entity';
import { Repository } from 'typeorm';
import { CreateDisponibilidadDto } from '../dto/create-disponibilidad.dto';

@Injectable()
export class DisponibilidadesService {

      constructor(
    @InjectRepository(Disponibilidad)
    private dispoRepo: Repository<Disponibilidad>
  ) {}

  create(dto: CreateDisponibilidadDto) {
    const nueva = this.dispoRepo.create(dto);
    return this.dispoRepo.save(nueva);
  }

  findByAdmin(adminId: number) {
    return this.dispoRepo.find({ where: { admin: { id: adminId } } });
  }
}
