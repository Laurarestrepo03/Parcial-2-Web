/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumController } from './album.controller';


@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  exports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
})
export class AlbumModule {}
