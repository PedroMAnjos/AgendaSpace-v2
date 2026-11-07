import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { PayBookingDto } from './dto/pay-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerifiedGuard } from '../auth/guards/verified.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Bookings')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, VerifiedGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Criar uma nova reserva' })
  @ApiResponse({ status: 201, description: 'Reserva criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(userId, createBookingDto);
  }

  @ApiOperation({ summary: 'Retorna as reservas do usuário autenticado como cliente' })
  @ApiResponse({ status: 200, description: 'Reservas do cliente retornadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('my-bookings')
  async findMyBookings(@CurrentUser('id') userId: string) {
    return this.bookingsService.findByClient(userId);
  }

  @ApiOperation({ summary: 'Retorna as reservas recebidas pelo anfitrião' })
  @ApiResponse({ status: 200, description: 'Reservas do anfitrião retornadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('host')
  async findHostBookings(@CurrentUser('id') userId: string) {
    return this.bookingsService.findByHost(userId);
  }

  @ApiOperation({ summary: 'Listar reservas do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de reservas retornada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiQuery({ name: 'type', required: false, enum: ['client', 'host'] })
  @Get()
  async findAll(
    @CurrentUser() user: { id: string; role: string },
    @Query('type') type?: 'client' | 'host',
  ) {
    return this.bookingsService.findAll(user.id, user.role, type);
  }

  @ApiOperation({ summary: 'Listar reservas/horários ocupados de um espaço' })
  @ApiResponse({ status: 200, description: 'Reservas do espaço retornadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'spaceId', type: String })
  @ApiQuery({ name: 'date', required: false, type: String })
  @Get('space/:spaceId')
  async findBySpace(
    @Param('spaceId') spaceId: string,
    @Query('date') date?: string,
  ) {
    return this.bookingsService.findBySpace(spaceId, date);
  }

  @ApiOperation({ summary: 'Buscar detalhes de uma reserva específica' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.bookingsService.findOne(id, user.id, user.role);
  }

  @ApiOperation({ summary: 'Atualizar status de uma reserva' })
  @ApiResponse({ status: 200, description: 'Status da reserva atualizado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: string },
    @Body() updateStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(
      id,
      user.id,
      user.role,
      updateStatusDto,
    );
  }

  @ApiOperation({ summary: 'Simular pagamento e aceite de contrato de uma reserva' })
  @ApiResponse({ status: 201, description: 'Pagamento simulado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @Post(':id/pay')
  async pay(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() payBookingDto: PayBookingDto,
  ) {
    return this.bookingsService.pay(id, userId, payBookingDto);
  }
}
