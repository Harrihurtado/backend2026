import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

@Entity('roles')
export class Rol {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios!: Usuario[];
}