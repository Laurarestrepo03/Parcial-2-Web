/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';

@Module({
  providers: [AlbumService]
})
export class AlbumModule {}
