/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
import { AlbumEntity } from './album.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {

    constructor(private readonly albumService: AlbumService) {}

    @Post()
    async createAlbum(@Body() albumDto: AlbumDto) {
        const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
        return await this.albumService.createAlbum(album);
    }

    @Get(':albumId')
     async findAlbumById(@Param('albumId') albumId: string) {
        return await this.albumService.findAlbumById(albumId);
    }

    @Post(':albumId/fotos/:fotoId')
    async addArtworkMuseum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string){
        return await this.albumService.addPhotoToAlbum(albumId, fotoId);
    }

    @Delete(':albumId')
    @HttpCode(204)
    async delete(@Param('albumId') albumId: string) {
        return await this.albumService.deleteAlbum(albumId);
    }

}
