/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class AlbumDto {

    @IsNotEmpty()
    readonly fechaInicio: Date;

    @IsNotEmpty()
    readonly fechaFin: Date;

    @IsString()
    readonly titulo: Date;

}
