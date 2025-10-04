import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Admin } from 'src/agenda/admin-agenda/entities/admin.entity';
import { Servicio } from 'src/agenda/servicio/servicio.entity';

@ObjectType()
@Entity('disponibilidades')
export class Disponibilidad {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dia_semana: string;  // lunes, martes, ...

  @Field()
  @Column({ type: 'time' })
  hora_inicio: string;

  @Field()
  @Column({ type: 'time' })
  hora_fin: string;

  @Field(() => Admin)
  @ManyToOne(() => Admin, (admin) => admin.disponibilidades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Field(() => [Servicio], { nullable: true })
  @OneToMany(() => Servicio, (servicio) => servicio.admin)
  servicios: Servicio[];
}
