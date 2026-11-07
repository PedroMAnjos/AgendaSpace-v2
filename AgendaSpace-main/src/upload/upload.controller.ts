import {
  Controller,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const ALLOWED_BUCKETS = ['spaces', 'avatars', 'feed'];

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

@ApiTags('Upload')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload de imagem para um bucket (spaces, avatars, feed)' })
  @ApiResponse({ status: 201, description: 'Arquivo enviado com sucesso, retorna { url }' })
  @ApiResponse({ status: 400, description: 'Bucket inválido, arquivo ausente ou tipo não permitido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'bucket', enum: ['spaces', 'avatars', 'feed'] })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post(':bucket')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @Param('bucket') bucket: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!ALLOWED_BUCKETS.includes(bucket)) {
      throw new BadRequestException(
        `Bucket "${bucket}" não é válido. Use: ${ALLOWED_BUCKETS.join(', ')}`,
      );
    }

    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo não permitido: ${file.mimetype}. Use: ${ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }

    const url = await this.uploadService.saveFile(file, bucket);

    return { url };
  }
}
