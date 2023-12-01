/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { RedSocialDto } from './red-social.dto';
import { RedSocialEntity } from './red-social.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';


@Controller('redes-sociales')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedSocialController {

    constructor(private readonly redSocialService: RedSocialService) {}

    @Post()
    async createAlbum(@Body() redSocialDto: RedSocialDto) {
        const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
        return await this.redSocialService.createRedSocial(redSocial);
    }

}
