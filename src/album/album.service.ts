/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if (album.titulo != "" && album.titulo != null) {
            return await this.albumRepository.save(album);
        }    
        else {
            throw new BusinessLogicException("Titulo was empty", BusinessError.PRECONDITION_FAILED);
        }  
    }

    async findAlbumById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album;
    }

    async addPhotoToAlbum(albumId: string, photoId: string): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: photoId}});
        if (!foto)
            throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]})
        if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        if (album.fechaInicio <= foto.fecha && foto.fecha <= album.fechaFin) {
            album.fotos = [...album.fotos, foto];
            return await this.albumRepository.save(foto);
        }  
        else {
            throw new BusinessLogicException("Fecha for foto was not between album fecha inicio and album fecha fin", BusinessError.NOT_FOUND);
        } 
    }

    async deleteAlbum(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        await this.albumRepository.remove(album);
    }

}
