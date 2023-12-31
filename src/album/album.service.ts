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
        if (album.titulo != "") {
            return await this.albumRepository.save(album);
        }    
        else if (album.titulo == "") {
            throw new BusinessLogicException("Titulo was empty", BusinessError.PRECONDITION_FAILED);
        }  
    }

    async findAlbumById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"]});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album;
    }

    async addPhotoToAlbum(albumId: string, photoId: string): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: photoId}});
        if (!foto)
            throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]});
        if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        if (album.fechaInicio <= foto.fecha && foto.fecha <= album.fechaFin) {
            if (album.fotos.length == 5) {
                throw new BusinessLogicException("An album can only have up to 5 photos", BusinessError.PRECONDITION_FAILED);
            }
            else if (album.fotos.length < 5){
                if (album.fotos.some(f => f.id == foto.id)) {
                    throw new BusinessLogicException("The photo with the given id is already in the album", BusinessError.PRECONDITION_FAILED);
                }
                else {
                    album.fotos = [...album.fotos, foto];
                    return await this.albumRepository.save(album);
                }
                
            }    
        }  
        else if (album.fechaInicio > foto.fecha || foto.fecha > album.fechaFin) {
            throw new BusinessLogicException("Fecha for photo was not between album fecha inicio and fecha fin", BusinessError.PRECONDITION_FAILED);
        } 
    }

    async deleteAlbum(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        try {
            await this.albumRepository.remove(album);
        }
        catch (error) {
            if (error.code === '23503') {
                throw new BusinessLogicException("An album with photos cannot be deleted", BusinessError.PRECONDITION_FAILED);
            }
        }
    }

}
