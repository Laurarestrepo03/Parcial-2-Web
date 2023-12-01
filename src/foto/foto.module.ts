/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { FotoController } from './foto.controller';

@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([FotoEntity])],
  controllers: [FotoController],
})
export class FotoModule {}
