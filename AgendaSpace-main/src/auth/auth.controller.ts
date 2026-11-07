import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto, VerifyCodeDto, ResendCodeDto } from './dto/login.dto';
import { VerifyEmailDto, ResendVerificationDto, ChangeEmailDto, ConfirmChangeEmailAuthDto } from './dto/verify-email.dto';
import { Enable2FADto, Disable2FADto, RegenerateRecoveryDto } from './dto/2fa.dto';
import { ChangePasswordInitDto, ChangePasswordConfirmDto, ForgotPasswordDto, ResetPasswordDto } from './dto/password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login com email e senha' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Retorna o usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @ApiOperation({ summary: 'Verificar email com token' })
  @ApiResponse({ status: 200, description: 'Email verificado com sucesso' })
  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @ApiOperation({ summary: 'Reenviar email de verificação' })
  @ApiResponse({ status: 200, description: 'Email de verificação reenviado' })
  @Post('resend-verification')
  async resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto);
  }

  @ApiOperation({ summary: 'Verificar código de login (2FA)' })
  @ApiResponse({ status: 200, description: 'Código verificado com sucesso' })
  @Post('login/verify-code')
  async verifyLoginCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyLoginCode(dto);
  }

  @ApiOperation({ summary: 'Reenviar código de login (2FA)' })
  @ApiResponse({ status: 200, description: 'Código reenviado com sucesso' })
  @Post('login/resend-code')
  async resendLoginCode(@Body() dto: ResendCodeDto) {
    return this.authService.resendLoginCode(dto);
  }

  @ApiOperation({ summary: 'Iniciar troca de email' })
  @ApiResponse({ status: 200, description: 'Processo de troca de email iniciado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('change-email')
  async changeEmailInit(@Req() req: any, @Body() dto: ChangeEmailDto) {
    return this.authService.changeEmailInit(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Confirmar troca de email com código' })
  @ApiResponse({ status: 200, description: 'Email alterado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('change-email/confirm')
  async changeEmailConfirm(@Req() req: any, @Body() dto: ConfirmChangeEmailAuthDto) {
    return this.authService.changeEmailConfirmAuth(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Consultar status de segurança (2FA)' })
  @ApiResponse({ status: 200, description: 'Status de segurança retornado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('security')
  async getSecurityStatus(@Req() req: any) {
    return this.authService.getSecurityStatus(req.user.id);
  }

  @ApiOperation({ summary: 'Iniciar ativação de 2FA' })
  @ApiResponse({ status: 200, description: 'Processo de ativação de 2FA iniciado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable/init')
  async enable2FAInit(@Req() req: any, @Body() dto: Enable2FADto) {
    return this.authService.enable2FAInit(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Confirmar ativação de 2FA' })
  @ApiResponse({ status: 200, description: '2FA ativado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable/confirm')
  async enable2FAConfirm(@Req() req: any, @Body() dto: VerifyCodeDto) {
    return this.authService.enable2FAConfirm(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Iniciar desativação de 2FA' })
  @ApiResponse({ status: 200, description: 'Processo de desativação de 2FA iniciado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('2fa/disable/init')
  async disable2FAInit(@Req() req: any, @Body() dto: Enable2FADto) {
    return this.authService.disable2FAInit(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Confirmar desativação de 2FA' })
  @ApiResponse({ status: 200, description: '2FA desativado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('2fa/disable/confirm')
  async disable2FAConfirm(@Req() req: any, @Body() dto: VerifyCodeDto) {
    return this.authService.disable2FAConfirm(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Iniciar regeneração de códigos de recuperação' })
  @ApiResponse({ status: 200, description: 'Processo de regeneração iniciado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('2fa/recovery/regenerate/init')
  async regenerateRecoveryInit(@Req() req: any, @Body() dto: RegenerateRecoveryDto) {
    return this.authService.regenerateRecoveryInit(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Confirmar regeneração de códigos de recuperação' })
  @ApiResponse({ status: 200, description: 'Códigos de recuperação regenerados' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('2fa/recovery/regenerate/confirm')
  async regenerateRecoveryConfirm(@Req() req: any, @Body() dto: VerifyCodeDto) {
    return this.authService.regenerateRecoveryConfirm(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Solicitar recuperação de senha' })
  @ApiResponse({ status: 200, description: 'Email de recuperação enviado' })
  @HttpCode(HttpStatus.OK)
  @Post('password/forgot')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Req() req: any) {
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
    return this.authService.forgotPassword(dto, clientIp);
  }

  @ApiOperation({ summary: 'Redefinir senha com token' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso' })
  @HttpCode(HttpStatus.OK)
  @Post('password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @ApiOperation({ summary: 'Iniciar troca de senha autenticada' })
  @ApiResponse({ status: 200, description: 'Processo de troca de senha iniciado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('password/change/init')
  async changePasswordInit(@Req() req: any, @Body() dto: ChangePasswordInitDto) {
    return this.authService.changePasswordInit(req.user.id, dto.currentPassword, dto.newPassword);
  }

  @ApiOperation({ summary: 'Confirmar troca de senha com código' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('password/change/confirm')
  async changePasswordConfirm(@Req() req: any, @Body() dto: ChangePasswordConfirmDto) {
    return this.authService.changePasswordConfirm(req.user.id, dto.challengeId, dto.code, dto.recoveryCode);
  }
}
