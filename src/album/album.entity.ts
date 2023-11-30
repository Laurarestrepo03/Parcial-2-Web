/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechafin: Date;

    @Column()
    titulo: string;

    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[]

}
