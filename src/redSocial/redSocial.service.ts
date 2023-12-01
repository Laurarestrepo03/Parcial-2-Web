/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedSocialEntity } from './redSocial.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RedSocialService {

    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>
    ){}

    async createRedSocial(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
        if (redSocial.slogan.length >= 20) {
            return await this.redSocialRepository.save(redSocial);
        }      
        else if (redSocial.slogan.length < 20) {
            throw new BusinessLogicException("Slogan was less than 20 chars long", BusinessError.PRECONDITION_FAILED);
        }
    }
}
