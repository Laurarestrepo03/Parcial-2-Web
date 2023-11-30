/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RedSocialService {

    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>
    ){}

    async createLibreria(red_social: RedSocialEntity): Promise<RedSocialEntity> {
        if (red_social.slogan.length >= 20) {
            return await this.redSocialRepository.save(red_social);
        }      
    }

}
