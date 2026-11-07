import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}

export class VerifyCodeDto {
  @ApiPropertyOptional({ example: 'challenge-uuid' })
  @IsString()
  @IsOptional()
  challengeId?: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: 'recovery-code-abc' })
  @IsString()
  @IsOptional()
  recoveryCode?: string;

  @ApiPropertyOptional({ example: 'user-uuid' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'senha123' })
  @IsString()
  @IsOptional()
  password?: string;
}

export class ResendCodeDto {
  @ApiProperty({ example: 'challenge-uuid' })
  @IsString()
  @IsNotEmpty()
  challengeId: string;
}
