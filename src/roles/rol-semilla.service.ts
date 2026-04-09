// rol-semilla.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

const ROLES_SEMILLA = [
  { nombre: 'admin' },
  { nombre: 'usuario' },
  { nombre: 'moderador' },
];

@Injectable()
export class RolSemillaService implements OnModuleInit {
  private readonly logger = new Logger(RolSemillaService.name);

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async onModuleInit() {
    await this.sembrarRoles();
  }

  private async sembrarRoles() {
    for (const rol of ROLES_SEMILLA) {
      const existe = await this.rolRepository.findOneBy({ nombre: rol.nombre });

      if (!existe) {
        await this.rolRepository.save(this.rolRepository.create(rol));
        this.logger.log(`Rol creado: ${rol.nombre}`);
      }
    }

    this.logger.log('Semilla de roles completada ✅');
  }
}