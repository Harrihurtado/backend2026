// usuarios/dto/update-usuario.dto.ts
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  rolId?: number;
}