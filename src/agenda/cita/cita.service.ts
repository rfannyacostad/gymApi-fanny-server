// src/agenda/cita/cita.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './cita.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async crearCita(cita: Partial<Cita>): Promise<Cita> {
    const nuevaCita = this.citaRepository.create(cita);
    return this.citaRepository.save(nuevaCita);
  }

  async obtenerCitas(): Promise<Cita[]> {
    return this.citaRepository.find();
  }

  async obtenerCitaPorId(id: number): Promise<Cita | null> {
    return this.citaRepository.findOne({ where: { id } });
  }

 async  actualizarCita(id: number, data: Partial<Cita>): Promise<Cita> {
  // 👇 convertimos fecha si viene como string
  const updateData: any = {
    ...data,
    fecha: data.fecha ? new Date(data.fecha as any) : undefined,
  };

  await this.citaRepository.update(id, updateData);

  const cita = await this.obtenerCitaPorId(id);
  if (!cita) {
    throw new Error(`No se encontró la cita con id ${id}`);
  }

  return cita;
}



  async eliminarCita(id: number): Promise<void> {
    await this.citaRepository.delete(id);
  }
}
