import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentMethodEnum {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
}

export class PayBookingDto {
  @ApiProperty({ enum: PaymentMethodEnum, example: PaymentMethodEnum.PIX })
  @IsEnum(PaymentMethodEnum, { message: 'Método de pagamento inválido' })
  @IsNotEmpty({ message: 'O método de pagamento é obrigatório' })
  method: PaymentMethodEnum;

  @ApiProperty({ example: 'chave-idempotencia-unica-123' })
  @IsString()
  @IsNotEmpty({ message: 'Chave de idempotência é obrigatória' })
  idempotencyKey: string;

  @ApiProperty({ example: 'Aceito os termos e condições do contrato versão 1.0.' })
  @IsString()
  @IsNotEmpty({ message: 'Texto de aceite do contrato é obrigatório' })
  contractAcceptedText: string;

  @ApiProperty({ example: '1.0' })
  @IsString()
  @IsNotEmpty({ message: 'Versão do contrato é obrigatória' })
  contractVersion: string;
}
