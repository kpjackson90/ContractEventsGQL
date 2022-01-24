import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  log_index!: number;

  @Column()
  transaction_index!: number;

  @Column()
  transaction_hash!: string;

  @Column()
  block_hash!: string;

  @Column()
  block_number!: number;

  @Column()
  address!: string;

  @Column()
  transaction_id!: string;

  @Column()
  return_value_from!: string;

  @Column()
  return_value_to!: string;

  @Column()
  return_value_token_id!: string;

  @Column()
  event_type!: string;

  @Column()
  signature!: string;

  @Column()
  read!: boolean;

  @Column({ name: 'created_at' })
  created_at?: Date;
}
