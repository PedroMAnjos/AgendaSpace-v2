import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum BookingStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ApprovalStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateBookingStatusDto {
  @ApiPropertyOptional({ enum: BookingStatusEnum, example: 'CONFIRMED' })
  @IsOptional()
  @IsEnum(BookingStatusEnum, { message: 'Status de reserva inválido' })
  status?: string;

  @ApiPropertyOptional({ enum: ApprovalStatusEnum, example: 'APPROVED' })
  @IsOptional()
  @IsEnum(ApprovalStatusEnum, { message: 'Status de aprovação inválido' })
  approvalStatus?: string;
}
