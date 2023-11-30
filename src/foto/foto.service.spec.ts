/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotoList: FotoEntity[];
  let usuario: UsuarioEntity;
  let album: AlbumEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotoList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        id: faker.string.uuid(),
        ISO: faker.number.int({min: 100, max: 6400}),
        valObturacion: faker.number.int({min: 2, max: 250}),
        apertura: faker.number.int({min: 1, max: 32}),
        fecha: faker.date.past(),
        usuario: usuario,
        album: album
      });
      fotoList.push(foto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new photo', async () => {
    const foto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: faker.number.int({min: 100, max: 6400}),
      valObturacion: faker.number.int({min: 2, max: 250}),
      apertura: faker.number.int({min: 1, max: 32}),
      fecha: faker.date.past(),
      usuario: usuario,
      album: album
    };

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({where: { id: newFoto.id }});
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.ISO).toEqual(newFoto.ISO);
    expect(storedFoto.valObturacion).toEqual(newFoto.valObturacion);
    expect(storedFoto.apertura).toEqual(newFoto.apertura);
    expect(storedFoto.fecha).toEqual(newFoto.fecha);
  });

  it('create should throw an exception for an invalid photo', async () => {
    const foto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: 3251, //above avg
      valObturacion: 127, //above avg
      apertura: 17, //above avg
      fecha: faker.date.past(),
      usuario: usuario,
      album: album
    };

    await expect(() => service.createFoto(foto)).rejects.toHaveProperty("message", "More than two values were above average");

  });

  it('delete should remove a photo', async () => {
    const foto: FotoEntity = fotoList[0];
    await service.deleteFoto(foto.id);
    const deletedFoto: FotoEntity = await repository.findOne({where:{ id: foto.id }});
    expect(deletedFoto).toBeNull();
  });

  it('delete should throw an exception for an invalid photo', async () => {
    const foto: FotoEntity = fotoList[0];
    await service.deleteFoto(foto.id);
    await expect(() => service.deleteFoto("0")).rejects.toHaveProperty("message", "The photo with the given id was not found")
  });
  
});
