/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';


@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
})
export class AlbumModule {}
