import { IsString, IsNotEmpty, MinLength, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail({}, { message: 'Informe um email válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'token-de-reset' })
  @IsString()
  @IsNotEmpty({ message: 'O token é obrigatório.' })
  token!: string;

  @ApiProperty({ example: 'novaSenha123', minLength: 6 })
  @IsString()
  @IsNotEmpty({ message: 'A nova senha é obrigatória.' })
  @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres.' })
  newPassword!: string;
}

export class ChangePasswordInitDto {
  @ApiProperty({ example: 'senhaAtual123' })
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @ApiProperty({ example: 'novaSenha123', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres.' })
  newPassword!: string;
}

export class ChangePasswordConfirmDto {
  @ApiProperty({ example: 'challenge-uuid' })
  @IsString()
  @IsNotEmpty()
  challengeId!: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: 'recovery-code-abc' })
  @IsString()
  @IsOptional()
  recoveryCode?: string;
}
