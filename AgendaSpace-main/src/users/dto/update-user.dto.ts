import { IsOptional, IsString, IsEnum, IsBoolean, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../auth/enums/role.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'João Silva' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'https://cdn.exemplo.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'usuario@email.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  @IsEnum(Role, { message: 'Role deve ser ADMIN ou USER.' })
  role?: Role;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiPropertyOptional({ example: 'Desenvolvedor apaixonado por tecnologia.' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: '+5511999999999' })
  @IsOptional()
  @ValidateIf(o => o.phone !== undefined && o.phone !== '')
  @IsString()
  phone?: string;
}
