/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RedSocialEntity } from '../redSocial/redSocial.entity';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @ManyToOne(() => RedSocialEntity, redSocial => redSocial.usuarios)
    redSocial: UsuarioEntity;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[]
    
}

