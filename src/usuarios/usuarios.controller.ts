import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(Number(id));
  }

  @Post()
  createUsuario(@Body() usuario: { nombre: string; email: string }) {
    return this.usuariosService.create(usuario);
  }

  @Patch(':id') 
  actualizarUsuario(
    @Param('id') id: string,
    @Body() usuario: { nombre?: string; email?: string },
  ) {
    return this.usuariosService.update(Number(id), usuario);
  }

  @Delete(':id')
  eliminarUsuario(@Param('id') id: string) {
  return this.usuariosService.remove(Number(id));
}
}
