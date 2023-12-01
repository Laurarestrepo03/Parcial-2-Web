/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {

    constructor(private readonly fotoService: FotoService) {}

    @Post()
    async createFoto(@Body() fotoDto: FotoDto) {
        const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
        return await this.fotoService.createFoto(foto);
    }

    @Get(':fotoId')
     async findFotoById(@Param('fotoId') fotoId: string) {
        return await this.fotoService.findFotoById(fotoId);
    }

    @Get()
    async findAllFotos() {
        return await this.fotoService.findAllFotos();
    }

    @Delete(':fotoId')
    @HttpCode(204)
    async deleteAlbum(@Param('fotoId') fotoId: string) {
        return await this.fotoService.deleteFoto(fotoId);
    }

}
