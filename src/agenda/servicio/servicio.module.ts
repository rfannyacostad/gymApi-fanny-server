import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioResolver } from './servicio.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio])],
  providers: [ServicioService, ServicioResolver],
  exports: [ServicioService],
})
export class ServicioModule {}
