/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FotoDto {

    @IsNumber()
    @IsNotEmpty()
    readonly ISO: number;

    @IsNumber()
    @IsNotEmpty()
    readonly valObturacion: number;

    @IsNumber()
    @IsNotEmpty()
    readonly apertura: number;

    @IsNotEmpty()
    readonly fecha: Date;

}
