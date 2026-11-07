import { Controller, Get, Post, Patch, Param, Body, UseGuards, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { PushService } from './push.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SubscribePushDto, UnsubscribePushDto } from './dto/push-subscription.dto';

@ApiTags('Notifications')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly pushService: PushService,
  ) {}

  @ApiOperation({ summary: 'Listar notificações do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Notificações retornadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'offset', required: false, type: String })
  @Get()
  async findAll(
    @CurrentUser('id') userId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.notificationsService.findAll(
      userId,
      limit ? parseInt(limit, 10) : 50,
      offset ? parseInt(offset, 10) : 0,
    );
  }

  @ApiOperation({ summary: 'Marcar todas as notificações como lidas' })
  @ApiResponse({ status: 200, description: 'Todas as notificações marcadas como lidas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Patch('read-all')
  async markAllAsRead(@CurrentUser('id') userId: string) {
    await this.notificationsService.markAllAsRead(userId);
    return { success: true };
  }

  @ApiOperation({ summary: 'Marcar uma notificação como lida' })
  @ApiResponse({ status: 200, description: 'Notificação marcada como lida' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id/read')
  async markAsRead(
    @CurrentUser('id') userId: string,
    @Param('id') notificationId: string,
  ) {
    await this.notificationsService.markAsRead(userId, notificationId);
    return { success: true };
  }

  @ApiOperation({ summary: 'Obter chave pública VAPID para push' })
  @ApiResponse({ status: 200, description: 'Chave pública retornada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('push/public-key')
  getPublicKey() {
    return this.pushService.getPublicKey();
  }

  @ApiOperation({ summary: 'Listar assinaturas push do usuário' })
  @ApiResponse({ status: 200, description: 'Assinaturas retornadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('push/subscriptions')
  async getSubscriptions(@CurrentUser('id') userId: string) {
    return this.pushService.getSubscriptions(userId);
  }

  @ApiOperation({ summary: 'Assinar notificações push' })
  @ApiResponse({ status: 201, description: 'Assinatura criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Post('push/subscribe')
  async subscribe(
    @CurrentUser('id') userId: string,
    @Body() dto: SubscribePushDto,
    @Req() req: Request,
  ) {
    const userAgent = req.headers['user-agent'] as string;
    return this.pushService.subscribe(userId, dto, userAgent);
  }

  @ApiOperation({ summary: 'Cancelar assinatura de notificações push' })
  @ApiResponse({ status: 201, description: 'Assinatura cancelada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Post('push/unsubscribe')
  async unsubscribe(
    @CurrentUser('id') userId: string,
    @Body() dto: UnsubscribePushDto,
  ) {
    return this.pushService.unsubscribe(userId, dto.endpoint);
  }

  @ApiOperation({ summary: 'Enviar push de teste para o usuário' })
  @ApiResponse({ status: 201, description: 'Push de teste enviado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Post('push/test')
  async sendTestPush(@CurrentUser('id') userId: string) {
    return this.pushService.sendTestPush(userId);
  }
}
