import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDisponibilidadDto } from '../dto/create-disponibilidad.dto';
import { DisponibilidadesService } from './disponibilidades.service';

@Controller('disponibilidades')
export class DisponibilidadesController {


  constructor(private readonly dispoService: DisponibilidadesService) {}

  @Post()
  create(@Body() dto: CreateDisponibilidadDto) {
    return this.dispoService.create(dto);
  }

  @Get('admin/:adminId')
  findByAdmin(@Param('adminId') adminId: string) {
    return this.dispoService.findByAdmin(+adminId);
  }


}
