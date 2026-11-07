import {
  IsUUID,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID('all', { message: 'O ID do espaço deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID do espaço é obrigatório' })
  spaceId: string;

  @ApiProperty({ example: '2026-11-10T09:00:00.000Z' })
  @IsISO8601({}, { message: 'A data/hora de início deve estar no formato ISO 8601 válido' })
  @IsNotEmpty({ message: 'A data/hora de início é obrigatória' })
  startDatetime: string;

  @ApiProperty({ example: '2026-11-10T12:00:00.000Z' })
  @IsISO8601({}, { message: 'A data/hora de término deve estar no formato ISO 8601 válido' })
  @IsNotEmpty({ message: 'A data/hora de término é obrigatória' })
  endDatetime: string;

  @ApiPropertyOptional({ example: 'Precisarei de cadeiras extras.' })
  @IsString()
  @IsOptional()
  notes?: string;
}
