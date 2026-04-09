import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {

  @ApiProperty({ example: "Harri" })
  @IsString()
  nombre!: string;

  @ApiProperty({ example: "harri@gmail.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "123456", minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  rolId!: number;
}