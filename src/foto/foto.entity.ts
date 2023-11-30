/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ISO: number;

    @Column()
    velObturacion: number;

    @Column()
    apertura: string;

    @Column()
    fecha: Date;

}
