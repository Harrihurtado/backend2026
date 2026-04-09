import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {

  @ApiProperty({
    example: "Laptop Gamer ASUS",
    description: "Nombre del producto"
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 2500000,
    description: "Precio del producto"
  })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiPropertyOptional({
    example: 15,
    description: "Cantidad disponible en stock"
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({
    example: "Laptop gamer con 16GB de RAM y RTX 4060",
    description: "Descripción del producto"
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    example: 2,
    description: "ID de la categoría a la que pertenece el producto"
  })
  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}