/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';

@Entity()
export class FotoEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ISO: number;

    @Column()
    valObturacion: number;

    @Column()
    apertura: number;

    @Column()
    fecha: Date;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;

}
