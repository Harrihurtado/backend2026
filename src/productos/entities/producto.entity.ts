import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Entity('productos')
export class ProductoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  categoriaId: number;

  @ManyToOne(() => Categoria, { nullable: true, eager: false })
  @JoinColumn({ name: 'categoriaId' })
  categorias: Categoria;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}