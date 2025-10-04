import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsDateString, IsInt, Min } from 'class-validator';

@InputType()
export class CreateEventoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @Field()
  @IsDateString()
  fecha: string;   // 👈 importante: string, no Date

  @Field(() => Int)
  @IsInt()
  @Min(1)
  duracion: number;

  @Field(() => Int)
  @IsInt()
  adminId: number;
}
