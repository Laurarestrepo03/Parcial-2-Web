/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { FotoController } from './foto.controller';
import { AlbumEntity } from 'src/album/album.entity';

@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([FotoEntity, AlbumEntity])],
  controllers: [FotoController],
})
export class FotoModule {}
