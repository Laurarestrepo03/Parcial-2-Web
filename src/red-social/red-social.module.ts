/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity';
import { RedSocialController } from './red-social.controller';

@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
  controllers: [RedSocialController],
})
export class RedSocialModule {}
