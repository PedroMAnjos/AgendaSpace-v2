import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSpaceDto {
  @ApiPropertyOptional({ example: 'Sala de Reuniões B' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Sala renovada com novo equipamento.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 15 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ example: 75.00 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  pricePerHour?: number;

  @ApiPropertyOptional({ example: ['Projetor', 'Wi-Fi'], type: [String] })
  @IsArray()
  @IsOptional()
  resources?: string[];

  @ApiPropertyOptional({ example: 'https://cdn.exemplo.com/sala2.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: ['https://cdn.exemplo.com/img2.jpg'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
