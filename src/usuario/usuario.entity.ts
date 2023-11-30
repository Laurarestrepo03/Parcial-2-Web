/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RedSocialEntity } from '../red-social/red-social.entity';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @ManyToOne(() => RedSocialEntity, red_social => red_social.usuarios)
    red_social: UsuarioEntity;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[]
    
}

