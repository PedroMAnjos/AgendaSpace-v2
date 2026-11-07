import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'token-de-verificacao' })
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ResendVerificationDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty()
  email: string;
}

export class ChangeEmailDto {
  @ApiProperty({ example: 'novo@email.com' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty()
  newEmail: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}

export class ConfirmChangeEmailAuthDto {
  @ApiProperty({ example: 'challenge-uuid' })
  @IsString()
  @IsNotEmpty()
  challengeId: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
