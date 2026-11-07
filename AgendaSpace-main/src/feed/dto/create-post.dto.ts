import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID('all', { message: 'O ID do espaço deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID do espaço é obrigatório' })
  spaceId: string;

  @ApiProperty({ example: 'https://cdn.exemplo.com/post.jpg' })
  @IsString({ message: 'A URL da imagem é obrigatória' })
  @IsNotEmpty({ message: 'A imagem é obrigatória' })
  imageUrl: string;

  @ApiProperty({ example: 'Evento incrível realizado neste espaço!' })
  @IsString({ message: 'O conteúdo deve ser um texto' })
  @IsNotEmpty({ message: 'O conteúdo do post é obrigatório' })
  content: string;
}
