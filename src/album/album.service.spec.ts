/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    albumList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await albumRepository.save({
        id: faker.string.uuid(),
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titulo: faker.lorem.word(),
        fotos: []
      });
      albumList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createAlbum should return a new album', async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo: faker.lorem.word(),
      fotos: []
    };

    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await albumRepository.findOne({where: { id: newAlbum.id }});
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.fechaInicio).toEqual(newAlbum.fechaInicio);
    expect(storedAlbum.fechaFin).toEqual(newAlbum.fechaFin);
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo);
  });

  it('createAlbum should throw an exception for an invalid album', async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo:"", //empty
      fotos: []
    };

    await expect(() => service.createAlbum(album)).rejects.toHaveProperty("message", "Titulo was empty");

  });

  it('findAlbumById should return an album by id', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    const album: AlbumEntity = await service.findAlbumById(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio)
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin)
    expect(album.titulo).toEqual(storedAlbum.titulo)
  });

  it('findAlbumById should throw an exception for an invalid album', async () => {
    await expect(() => service.findAlbumById("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });

  it('addPhotoToAlbum should add a photo to an album', async () => {
    
    const newAlbum: AlbumEntity = await albumRepository.save({
      id: faker.string.uuid(),
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo: faker.lorem.word(),
      fotos: []
    })

    const newFoto: FotoEntity = await fotoRepository.save({
      id: faker.string.uuid(),
      ISO: faker.number.int({min: 100, max: 3250}), //3250 so it is not above avg
      valObturacion: faker.number.int({min: 2, max: 126}), //126 so it is not above avg
      apertura: faker.number.int({min: 1, max: 16}), //16 so it is not above avg
      fecha: faker.date.between({from: newAlbum.fechaInicio, to: newAlbum.fechaFin})
    });

    const result: AlbumEntity = await service.addPhotoToAlbum(newAlbum.id, newFoto.id);
    
    expect(result.fotos.length).toBe(1);
    expect(result.fotos[0]).not.toBeNull();
    expect(result.fotos[0].ISO).toEqual(newFoto.ISO)
    expect(result.fotos[0].valObturacion).toEqual(newFoto.valObturacion)
    expect(result.fotos[0].apertura).toEqual(newFoto.apertura)
    expect(result.fotos[0].fecha).toEqual(newFoto.fecha)
  });

  it('addPhotoToAlbum should should throw exception for an invalid photo', async () => {
    
    const newAlbum: AlbumEntity = await albumRepository.save({
      id: faker.string.uuid(),
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo: faker.lorem.word(),
      fotos: []
    })

    const newFoto: FotoEntity = await fotoRepository.save({
      id: faker.string.uuid(),
      ISO: faker.number.int({min: 100, max: 3250}), 
      valObturacion: faker.number.int({min: 2, max: 126}), 
      apertura: faker.number.int({min: 1, max: 16}),
      fecha: faker.date.past({refDate: newAlbum.fechaInicio}) 
    });

    await expect(() => service.addPhotoToAlbum(newAlbum.id, newFoto.id)).rejects.toHaveProperty("message", "Fecha for photo was not between album fecha inicio and fecha fin");
  });

  it('deleteAlbum should remove an album', async () => {
    const album: AlbumEntity = albumList[0];
    await service.deleteAlbum(album.id);
    const deletedAlbum: AlbumEntity = await albumRepository.findOne({where:{ id: album.id}});
    expect(deletedAlbum).toBeNull();
  });

  it('deleteAlbum should throw an exception for an invalid album', async () => {
    const album: AlbumEntity = albumList[0];
    await service.deleteAlbum(album.id);
    await expect(() => service.deleteAlbum("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });

});
