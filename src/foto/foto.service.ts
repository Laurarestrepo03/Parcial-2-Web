/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.ISO < 100 || foto.ISO > 6400) {
            throw new BusinessLogicException("ISO was not between 100 and 6400", BusinessError.PRECONDITION_FAILED);
        }
        else if (foto.valObturacion < 2 || foto.valObturacion > 250) {
            throw new BusinessLogicException("ValObturacion was not between 2 and 250", BusinessError.PRECONDITION_FAILED);
        }
        else if (foto.apertura < 1 || foto.apertura > 32) {
            throw new BusinessLogicException("Apertura was not between 1 and 32", BusinessError.PRECONDITION_FAILED);
        }
        else {
            let cuenta = 0;
            if (foto.ISO > (100+6400)/2) { cuenta = cuenta+1; }
            if (foto.valObturacion > (2+250)/2) { cuenta = cuenta+1; }
            if (foto.apertura > (1+32)/2) { cuenta = cuenta+1; }
            if (cuenta > 2) {
                throw new BusinessLogicException("More than two values were above average", BusinessError.PRECONDITION_FAILED);
            }  
            else {
                return await this.fotoRepository.save(foto);
            }
        }
    }

    async findFotoById(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["usuario", "album"]});
        if (!foto)
          throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
   
        return foto;
    }

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["usuario", "album"] });
    }

    async deleteFoto(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ['album']});
        if (!foto) {
          throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
        }
        const albumId = foto.album?.id;
        await this.fotoRepository.remove(foto);
        if (albumId != undefined) {
            const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]});
            if (album.fotos.length === 0) {
              await this.albumRepository.remove(album);
            }
          }
      }
      
}
