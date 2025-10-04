// src/cita/cita.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from '../evento/entities/evento.entity';
import { CitaService } from './cita.service';
import { Cita } from './cita.entity';
import { CitaResolver } from './cita.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Cita, Evento])],
  providers: [CitaService,CitaResolver],
  exports: [CitaService],
})
export class CitaModule {}
