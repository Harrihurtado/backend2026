import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-product.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async findAll(): Promise<ProductoEntity[]> {
    return await this.productoRepository.find({ relations: ['categorias'] });
  }

  async findOne(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categorias'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async create(createProductoDto: CreateProductoDto): Promise<ProductoEntity> {
    const producto = this.productoRepository.create({
      nombre: createProductoDto.nombre,
      precio: createProductoDto.precio,
      stock: createProductoDto.stock ?? 0,
      descripcion: createProductoDto.descripcion,
      categoriaId: createProductoDto.categoriaId,
    });
    return await this.productoRepository.save(producto);
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<ProductoEntity> {
    const producto = await this.findOne(id); // lanza 404 si no existe
    Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const producto = await this.findOne(id); // lanza 404 si no existe
    await this.productoRepository.remove(producto);
    return { message: `Producto con id ${id} eliminado correctamente` };
  }
}