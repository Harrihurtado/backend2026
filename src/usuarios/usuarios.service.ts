import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { Rol } from '../roles/rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
  ) {}

  findAll() {
    return this.usuarioRepo.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async create(dto: CreateUsuarioDto) {
    const rol = await this.rolRepo.findOne({
      where: { id: dto.rolId }
    });

    if (!rol) {
      throw new NotFoundException('El rol no existe');
    }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const usuario = this.usuarioRepo.create({
    nombre: dto.nombre,
    email: dto.email,
    password: hashedPassword,
    rol: rol
  });


    return this.usuarioRepo.save(usuario);
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    if (dto.rolId) {
      const rol = await this.rolRepo.findOne({
        where: { id: dto.rolId }
      });

      if (!rol) {
        throw new NotFoundException('El rol no existe');
      }

      usuario.rol = rol;
    }

    Object.assign(usuario, dto);

    return this.usuarioRepo.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepo.remove(usuario);
  }
}