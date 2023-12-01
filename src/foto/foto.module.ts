/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { FotoController } from './foto.controller';
import { AlbumModule } from '../album/album.module';
import { AlbumService } from '../album/album.service';

@Module({
  providers: [FotoService, AlbumService],
  imports: [TypeOrmModule.forFeature([FotoEntity]), AlbumModule],
  controllers: [FotoController],
})
export class FotoModule {}
