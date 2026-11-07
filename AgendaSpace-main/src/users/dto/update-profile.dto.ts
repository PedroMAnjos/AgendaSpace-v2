import { IsOptional, IsString, MaxLength, Matches, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'João Silva' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'https://cdn.exemplo.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'Desenvolvedor apaixonado por tecnologia.', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({ example: '+5511999999999', maxLength: 20 })
  @IsOptional()
  @ValidateIf(o => o.phone !== undefined && o.phone !== '')
  @IsString()
  @Matches(/^\+?[1-9]\d{6,14}$/, { message: 'Formato de telefone inválido. Use o padrão internacional (ex: +5511999999999)' })
  @MaxLength(20)
  phone?: string;
}
