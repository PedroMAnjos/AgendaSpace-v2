import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerifiedGuard } from '../auth/guards/verified.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @ApiOperation({ summary: 'Criar um novo espaço' })
  @ApiResponse({ status: 201, description: 'Espaço criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createSpaceDto: CreateSpaceDto,
  ) {
    return this.spacesService.create(userId, createSpaceDto);
  }

  @ApiOperation({ summary: 'Listar todos os espaços disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de espaços retornada' })
  @ApiQuery({ name: 'activeOnly', required: false, type: String })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'includeDeleted', required: false, type: String })
  @Get()
  async findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('q') q?: string,
    @Query('includeDeleted') includeDeleted?: string,
  ) {
    const isFiltered = activeOnly !== undefined ? activeOnly === 'true' : true;
    const isIncludeDeleted = includeDeleted !== undefined ? includeDeleted === 'true' : false;
    return this.spacesService.findAll(isFiltered, q, isIncludeDeleted);
  }

  @ApiOperation({ summary: 'Listar espaços do usuário autenticado (anfitrião)' })
  @ApiResponse({ status: 200, description: 'Espaços do anfitrião retornados' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get('mine')
  async findMine(@CurrentUser('id') userId: string) {
    return this.spacesService.findByOwner(userId);
  }

  @ApiOperation({ summary: 'Buscar detalhes de um espaço específico' })
  @ApiResponse({ status: 200, description: 'Espaço encontrado' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user?: { id: string; role: string },
  ) {
    return this.spacesService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar um espaço' })
  @ApiResponse({ status: 200, description: 'Espaço atualizado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: string },
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    return this.spacesService.update(id, user.id, user.role, updateSpaceDto);
  }

  @ApiOperation({ summary: 'Desativar/remover um espaço' })
  @ApiResponse({ status: 200, description: 'Espaço removido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.spacesService.remove(id, user.id, user.role);
  }
}
