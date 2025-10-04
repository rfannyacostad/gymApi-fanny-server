import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from 'src/agenda/evento/entities/evento.entity';
import { Disponibilidad } from 'src/agenda/evento/entities/disponibilidad.entity';
import { Servicio } from 'src/agenda/servicio/servicio.entity';

@ObjectType() // 👈 GraphQL
@Entity('admins') // 👈 nombre de la tabla
export class Admin {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  telefono?: string;

  @Field(() => [Evento], { nullable: true })
  @OneToMany(() => Evento, (evento) => evento.admin)
  eventos: Evento[];

  @Field(() => [Disponibilidad], { nullable: true })
  @OneToMany(() => Disponibilidad, (disp) => disp.admin)
  disponibilidades: Disponibilidad[];

  @Field(() => [Servicio], { nullable: true })
  @OneToMany(() => Servicio, (servicio) => servicio.admin)
  servicios: Servicio[];
}
