import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Servicio } from 'src/agenda/servicio/servicio.entity';
import { Evento } from '../evento/entities/evento.entity';
import { User } from 'src/user/user.entity';

@ObjectType()
@Entity('citas')
export class Cita {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'nombre_cliente', type: 'varchar', length: 150 })
  nombreCliente: string;

  @Field()
  @Column({ name: 'telefono_cliente', type: 'varchar', length: 20 })
  telefonoCliente: string;

  @Field(() => String, { nullable: true })
@Column({ type: 'date', nullable: true })
fecha?: string;

  @Field()
  @Column({ name: 'hora', type: 'time' })
  hora: string;

  @Field()
  @Column({ name: 'estado', type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  // 🔹 Relación con Evento
  @Field(() => Int)
  @Column({ name: 'evento_id' })
  eventoId: number;

  @Field(() => Evento)
  @ManyToOne(() => Evento, (evento) => evento.citas, { eager: true })
  @JoinColumn({ name: 'evento_id' })
  evento: Evento;

  // 🔹 Relación con Servicio
  @Field(() => Int, { nullable: true })
  @Column({ name: 'servicio_id', nullable: true })
  servicioId?: number;

  @Field(() => Servicio, { nullable: true })
  @ManyToOne(() => Servicio, { eager: true, nullable: true })
  @JoinColumn({ name: 'servicio_id' })
  servicio?: Servicio;

  // 🔹 Nueva relación con Cliente
  @Field(() => Int, { nullable: true })
  @Column({ name: 'cliente_id', nullable: true })
  clienteId?: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: User;
}
