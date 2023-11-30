/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';

@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([FotoEntity])],
})
export class FotoModule {}
