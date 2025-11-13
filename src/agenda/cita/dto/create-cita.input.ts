import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

@InputType()
export class CreateCitaInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  nombreCliente: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  telefonoCliente: string;

  @Field()
  @IsDateString()
  fecha: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  hora: string;

  @Field()
  @IsString()
  estado: string;

  @Field(() => Int)
  @IsInt()
  eventoId: number;

  @Field(() => Int)
  @IsInt()
  servicioId: number;

  // ✅ Agregar este campo opcional
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  clienteId?: number;
}
