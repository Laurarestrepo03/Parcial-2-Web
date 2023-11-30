/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.ISO < 100 || foto.ISO > 6400) {
            throw new BusinessLogicException("ISO was not between 100 and 6400", BusinessError.PRECONDITION_FAILED);
        }
        else if (foto.valObturacion < 2 || foto.valObturacion)
    }


}
