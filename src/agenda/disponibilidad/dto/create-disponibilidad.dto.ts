import { IsString, IsNotEmpty, IsInt, IsMilitaryTime } from 'class-validator';

export class CreateDisponibilidadDto {
  @IsInt()
  adminId: number;

  @IsString()
  @IsNotEmpty()
  dia_semana: string;   // ej: "lunes"

  @IsMilitaryTime()
  hora_inicio: string;  // ej: "10:00"

  @IsMilitaryTime()
  hora_fin: string;     // ej: "18:00"
}
