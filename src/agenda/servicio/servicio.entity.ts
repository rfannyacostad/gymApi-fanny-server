import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from '../admin-agenda/entities/admin.entity';
import { Evento } from '../evento/entities/evento.entity';

@ObjectType()
@Entity('servicios')
export class Servicio {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'admin_id' })
  adminId: number;

  @Field()
  @Column()
  nombre: string;

  @Field(() => Int)
  @Column({ name: 'duracion_min', type: 'int' })
  duracionMin: number;

  @Field(() => Int)
  @Column({ name: 'precio_cents', type: 'int', default: 0 })
  precioCents: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field(() => Boolean)
  @Column({ default: true })
  activo: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'evento_id', nullable: true })
  eventoId?: number;

  @Field(() => Evento, { nullable: true })
  @ManyToOne(() => Evento, (evento) => evento.servicios, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'evento_id' })
  evento?: Evento;

  @Field(() => Admin)
  @ManyToOne(() => Admin, (admin) => admin.servicios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
