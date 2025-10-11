import { Field, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsNumber, IsOptional } from "class-validator";

@InputType()
export class UpdateUser {
  @Field(() => Int, { description: "ID del usuario", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: "Nombre del usuario", nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @Field(() => Boolean, { description: "Usuario activo", nullable: true })
  @IsOptional()
  @IsBoolean()
  actived?: boolean;

  @Field(() => String, { description: "Imagen de perfil", nullable: true })
  @IsOptional()
  @IsString()
  img?: string;

  @Field(() => Boolean, { description: "Es administrador", nullable: true })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @Field(() => Int, { description: "Admin asociado (si aplica)", nullable: true })
  @IsOptional()
  @IsNumber()
  adminId?: number;

  @Field(() => Int, { description: "Días disponibles", nullable: true })
  @IsOptional()
  @IsNumber()
  available_days?: number;
}
