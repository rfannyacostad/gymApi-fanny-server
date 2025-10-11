import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

@InputType()
export class CreateUser {
  @Field()
  @IsString()
  @MaxLength(50)
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  actived: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  huella?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  img?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  adminId?: number; // 🔹 El ID del admin (si el usuario pertenece a uno)

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  available_days?: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean; // 🔹 True si es administrador
}
