import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateServicioInput {
  @Field(() => Int)
  @IsInt()
  adminId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  duracionMin: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  precioCents?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;
}

@InputType()
export class UpdateServicioInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nombre?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  duracionMin?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  precioCents?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
