/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity()
export class RedSocialEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    slogan: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.red_social)
    usuarios: UsuarioEntity[];

}