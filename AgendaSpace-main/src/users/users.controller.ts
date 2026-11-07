import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Profiles')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Listar todos os usuários (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil retornado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('me')
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @ApiOperation({ summary: 'Retorna as preferências do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Preferências retornadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('me/preferences')
  async getPreferences(@CurrentUser('id') userId: string) {
    return this.usersService.getPreferences(userId);
  }

  @ApiOperation({ summary: 'Atualiza as preferências do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Preferências atualizadas' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Patch('me/preferences')
  async updatePreferences(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdatePreferencesDto,
  ) {
    return this.usersService.updatePreferences(userId, dto);
  }

  @ApiOperation({ summary: 'Atualiza o perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Patch('me')
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.update(userId, updateProfileDto);
  }

  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: { id: string; role: string },
  ) {
    const user = await this.usersService.findOne(id);
    if (currentUser.role !== 'ADMIN' && currentUser.id !== id) {
      const pref = await this.usersService.getPreferences(id);
      const { phone, email, ...publicData } = user;
      if (pref.showPhone) {
        return { ...publicData, phone };
      }
      return publicData;
    }
    return user;
  }

  @ApiOperation({ summary: 'Atualiza dados de um usuário (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Banir/soft-delete um usuário (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuário banido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') adminId: string,
  ) {
    return this.usersService.banUser(id, adminId);
  }

  @ApiOperation({ summary: 'Reativar/desbanir um usuário (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuário reativado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id/restore')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async restore(
    @Param('id') id: string,
  ) {
    return this.usersService.unbanUser(id);
  }
}
