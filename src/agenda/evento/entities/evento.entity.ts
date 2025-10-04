import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Admin } from 'src/agenda/admin-agenda/entities/admin.entity';
import { Cita } from 'src/agenda/cita/cita.entity';
import { Servicio } from 'src/agenda/servicio/servicio.entity';

@ObjectType()
@Entity('eventos')
export class Evento {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  titulo: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  descripcion?: string;

  @Field()
  @Column()
  fecha: Date;

  @Field(() => Int)
  @Column()
  duracion: number;

  @Field(() => [Cita], { nullable: true })
  @OneToMany(() => Cita, (cita) => cita.evento, { cascade: true })
  citas: Cita[];

  @Field(() => Admin)
  @ManyToOne(() => Admin, (admin) => admin.eventos, { eager: true })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Field(() => [Servicio], { nullable: true })
  @OneToMany(() => Servicio, (servicio) => servicio.evento)
  servicios: Servicio[];
}
