import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PushSubscriptionKeysDto {
  @ApiProperty({ example: 'BNcRdreALRFXTkOOUHK...' })
  @IsString()
  @IsNotEmpty()
  p256dh: string;

  @ApiProperty({ example: 'tBHItJI5svbpez7KI4CCXg==' })
  @IsString()
  @IsNotEmpty()
  auth: string;
}

export class SubscribePushDto {
  @ApiProperty({ example: 'https://fcm.googleapis.com/fcm/send/...' })
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @ApiProperty({ type: () => PushSubscriptionKeysDto })
  @IsObject()
  @ValidateNested()
  @Type(() => PushSubscriptionKeysDto)
  keys: PushSubscriptionKeysDto;

  @ApiPropertyOptional({ example: 'Mozilla/5.0 Chrome/...' })
  @IsString()
  @IsOptional()
  deviceInfo?: string;
}

export class UnsubscribePushDto {
  @ApiProperty({ example: 'https://fcm.googleapis.com/fcm/send/...' })
  @IsString()
  @IsNotEmpty()
  endpoint: string;
}
