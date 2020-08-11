import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

/**
 * UM para um (OneToOne) -> 1 usuario tem 1 agendamento
 * Um para Muitos (OneToMany) -> 1 Usuario tem muitos agendamentos
 * Muitos para MUitos (ManyToMany) -> MUitos usuarios participam de muitos agendamentos , 1 prestador de serviço pudesse participar de muitos serviços
 */

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Agendamento é o reverso -> muito agendamento para um usuario
  @JoinColumn({ name: 'provider_id' }) // Qual é a coluna que vai identificar qual é o prestador desse agendamento
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
