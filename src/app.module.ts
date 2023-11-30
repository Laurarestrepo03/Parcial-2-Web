/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedSocialModule } from './red-social/red-social.module';
import { AlbumModule } from './album/album.module';
import { FotoEntity } from './foto/foto.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { RedSocialEntity } from './red-social/red-social.entity';
import { AlbumEntity } from './album/album.entity';

@Module({
  imports: [FotoModule, UsuarioModule, RedSocialModule, AlbumModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'redesSociales',
      entities: [FotoEntity, UsuarioEntity, RedSocialEntity, AlbumEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      //logging: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
