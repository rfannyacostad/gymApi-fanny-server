import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventoInput } from './dto/create-evento.input';
import { UpdateEventoInput } from './dto/update-evento.input';
import { Admin } from 'src/agenda/admin-agenda/entities/admin.entity';
import { Evento } from './entities/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  // 🔹 Buscar todos los eventos de un admin
  findAllByAdmin(adminId: number): Promise<Evento[]> {
    return this.eventoRepository.find({
      where: { admin: { id: adminId } },
      relations: [
        'citas',
        'citas.servicio',
        'admin',
        'admin.disponibilidades',
        'admin.servicios',
        'servicios',
      ],
    });
  }

  // 🔹 Buscar un evento específico
  findOne(id: number): Promise<Evento | null> {
    return this.eventoRepository.findOne({
      where: { id },
      relations: [
        'citas',
        'citas.servicio',
        'admin',
        'admin.disponibilidades',
        'admin.servicios',
        'servicios',
      ],
    });
  }

  // 🔹 Crear un evento
  async create(dto: CreateEventoInput): Promise<Evento> {
    const evento = this.eventoRepository.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      fecha: new Date(dto.fecha),
      duracion: dto.duracion,
      admin: { id: dto.adminId } as Admin,
    });

    return this.eventoRepository.save(evento);
  }

  // 🔹 Actualizar evento
  async update(id: number, data: UpdateEventoInput): Promise<Evento> {
    await this.eventoRepository.update(id, data);
    return this.findOne(id);
  }

  // 🔹 Eliminar evento
  async delete(id: number): Promise<boolean> {
    await this.eventoRepository.delete(id);
    return true;
  }
}
