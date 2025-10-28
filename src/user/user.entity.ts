import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Cashier } from 'src/point-of-sale/cashiers/entities/cashier.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ default: false })
  @Field(() => Boolean)
  actived: boolean = false;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  huella: string; 

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  img: string; 


  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  available_days: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  @Field({ nullable: true })
  username: string;
  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  password: string;


    @Field({ defaultValue: false })
    @Column({ default: false })
    isAdmin: boolean; // ✅ <-- este campo
}





