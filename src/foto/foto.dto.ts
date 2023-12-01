/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

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

    @IsDate()
    @IsNotEmpty()
    readonly fecha: Date;

}
