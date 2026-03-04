import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  private usuarios = [
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com' },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com' },
    { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com' },
  ];

  findAll() {
    return this.usuarios;
  }

  findOne(id: number) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  create(usuario: { nombre: string; email: string }) {
    const nuevoUsuario = {
      id: this.usuarios.length + 1,
      ...usuario,
    };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  update(id: number, datosActualizados: { nombre?: string; email?: string }) {
    const usuario = this.findOne(id);

    if (datosActualizados.nombre !== undefined) {
      usuario.nombre = datosActualizados.nombre;
    }

    if (datosActualizados.email !== undefined) {
      usuario.email = datosActualizados.email;
    }

    return usuario;
  }

  remove(id: number) {
    const index = this.usuarios.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const usuarioEliminado = this.usuarios[index];
    this.usuarios.splice(index, 1);

    return usuarioEliminado;
  }
}