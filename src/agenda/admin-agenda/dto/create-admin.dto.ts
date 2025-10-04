export class CreateUserAgendaDto {
  nombre: string;
  email: string;
}
// src/admin/dto/create-admin.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()  // 👈 lo hacemos opcional por si no siempre se quiere registrar
  telefono?: string;
}
