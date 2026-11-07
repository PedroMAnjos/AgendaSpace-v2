import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Optional,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FeedService } from './feed.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerifiedGuard } from '../auth/guards/verified.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: 'Publicar novo post vinculado a um espaço' })
  @ApiResponse({ status: 201, description: 'Post criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('posts')
  async createPost(
    @CurrentUser('id') authorId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.feedService.createPost(authorId, createPostDto);
  }

  @ApiOperation({ summary: 'Retorna o feed global de posts' })
  @ApiResponse({ status: 200, description: 'Feed global retornado' })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('posts')
  async getGlobalPosts(
    @Query('limit') limitStr?: string,
    @Query('cursor') cursor?: string,
    @Optional() @CurrentUser('id') userId?: string,
  ) {
    const limit = limitStr ? parseInt(limitStr, 10) : 10;
    return this.feedService.getGlobalPosts(limit, cursor, userId);
  }

  @ApiOperation({ summary: 'Retorna o feed de posts de um espaço específico' })
  @ApiResponse({ status: 200, description: 'Feed do espaço retornado' })
  @ApiParam({ name: 'spaceId', type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('spaces/:spaceId')
  async getPostsBySpace(
    @Param('spaceId') spaceId: string,
    @Query('limit') limitStr?: string,
    @Query('cursor') cursor?: string,
    @Optional() @CurrentUser('id') userId?: string,
  ) {
    const limit = limitStr ? parseInt(limitStr, 10) : 10;
    return this.feedService.getPostsBySpace(spaceId, limit, cursor, userId);
  }

  @ApiOperation({ summary: 'Adicionar ou remover curtida de um post (toggle)' })
  @ApiResponse({ status: 200, description: 'Curtida alternada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'postId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @HttpCode(HttpStatus.OK)
  @Post('posts/:postId/like')
  async toggleLike(
    @Param('postId') postId: string,
    @CurrentUser('id') authorId: string,
  ) {
    return this.feedService.toggleLike(postId, authorId);
  }

  @ApiOperation({ summary: 'Adicionar comentário a um post' })
  @ApiResponse({ status: 201, description: 'Comentário adicionado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'postId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('posts/:postId/comments')
  async addComment(
    @Param('postId') postId: string,
    @CurrentUser('id') authorId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.feedService.addComment(postId, authorId, createCommentDto);
  }

  @ApiOperation({ summary: 'Excluir um post' })
  @ApiResponse({ status: 200, description: 'Post excluído com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'postId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Delete('posts/:postId')
  async deletePost(
    @Param('postId') postId: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.feedService.deletePost(postId, user);
  }

  @ApiOperation({ summary: 'Excluir um comentário' })
  @ApiResponse({ status: 200, description: 'Comentário excluído com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'commentId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Delete('comments/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.feedService.deleteComment(commentId, user);
  }

  @ApiOperation({ summary: 'Ocultar um post do feed do usuário' })
  @ApiResponse({ status: 200, description: 'Post ocultado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'postId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('posts/:postId/hide')
  async hidePost(
    @Param('postId') postId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.feedService.hidePost(postId, userId);
  }

  @ApiOperation({ summary: 'Desocultar um post do feed do usuário' })
  @ApiResponse({ status: 200, description: 'Post desocultado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'postId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('posts/:postId/unhide')
  async unhidePost(
    @Param('postId') postId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.feedService.unhidePost(postId, userId);
  }

  @ApiOperation({ summary: 'Reportar um post como inadequado' })
  @ApiResponse({ status: 201, description: 'Post reportado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'postId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('posts/:postId/report')
  async reportPost(
    @Param('postId') postId: string,
    @CurrentUser('id') userId: string,
    @Body('reason') reason: string,
  ) {
    return this.feedService.reportPost(postId, userId, reason || 'Conteúdo inadequado');
  }

  @ApiOperation({ summary: 'Listar comentários de um post' })
  @ApiResponse({ status: 200, description: 'Comentários retornados' })
  @ApiParam({ name: 'postId', type: String })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @Get('posts/:postId/comments')
  async getPostComments(
    @Param('postId') postId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limitStr?: string,
  ) {
    let limit = limitStr ? parseInt(limitStr, 10) : 10;
    if (limit > 50) limit = 50;
    return this.feedService.getPostComments(postId, cursor, limit);
  }

  @ApiOperation({ summary: 'Listar reports de posts (moderação)' })
  @ApiResponse({ status: 200, description: 'Reports retornados' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get('reports')
  async getReports(
    @CurrentUser() user: { id: string; role: string },
    @Query('limit') limitStr?: string,
    @Query('cursor') cursor?: string,
  ) {
    let limit = limitStr ? parseInt(limitStr, 10) : 10;
    return this.feedService.getReports(user, limit, cursor);
  }

  @ApiOperation({ summary: 'Resolver um report de post' })
  @ApiResponse({ status: 201, description: 'Report resolvido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'reportId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('reports/:reportId/resolve')
  async resolveReport(
    @Param('reportId') reportId: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.feedService.resolveReport(reportId, user);
  }

  @ApiOperation({ summary: 'Descartar um report de post' })
  @ApiResponse({ status: 201, description: 'Report descartado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'reportId', type: String })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Post('reports/:reportId/discard')
  async discardReport(
    @Param('reportId') reportId: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.feedService.discardReport(reportId, user);
  }
}
