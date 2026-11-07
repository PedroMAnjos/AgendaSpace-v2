import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsNumber,
  IsArray,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpaceDto {
  @ApiProperty({ example: 'Sala de Reuniões A' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do espaço é obrigatório' })
  name: string;

  @ApiPropertyOptional({ example: 'Sala climatizada com capacidade para 10 pessoas.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt({ message: 'A capacidade deve ser um número inteiro' })
  @Min(1, { message: 'A capacidade mínima é de 1 pessoa' })
  capacity: number;

  @ApiProperty({ example: 50.00 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço por hora deve ser um valor numérico válido' })
  @Min(0, { message: 'O preço por hora não pode ser negativo' })
  pricePerHour: number;

  @ApiPropertyOptional({ example: ['Projetor', 'Wi-Fi', 'Ar-condicionado'], type: [String] })
  @IsArray()
  @IsOptional()
  resources?: string[];

  @ApiPropertyOptional({ example: 'https://cdn.exemplo.com/sala.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: ['https://cdn.exemplo.com/img1.jpg'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
