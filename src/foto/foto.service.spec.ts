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
import { AlbumService } from '../album/album.service';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotoList: FotoEntity[];
  let usuario: UsuarioEntity;
  let album: AlbumEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService, AlbumService],
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

  it('createFoto should return a new photo', async () => {
    const foto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: faker.number.int({min: 100, max: 3250}), //3250 so it is not above avg
      valObturacion: faker.number.int({min: 2, max: 126}), //126 so it is not above avg
      apertura: faker.number.int({min: 1, max: 16}), //16 so it is not above avg
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

  it('createFoto should throw an exception for an invalid photo', async () => {
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

  it('findFotoById should return a photo by id', async () => {
    const storedFoto: FotoEntity = fotoList[0];
    const foto: FotoEntity = await service.findFotoById(storedFoto.id);
    expect(foto).not.toBeNull();
    expect(foto.ISO).toEqual(storedFoto.ISO)
    expect(foto.valObturacion).toEqual(storedFoto.valObturacion)
    expect(foto.apertura).toEqual(storedFoto.apertura)
    expect(foto.fecha).toEqual(storedFoto.fecha)
  });

  it('findFotoById should throw an exception for an invalid photo', async () => {
    await expect(() => service.findFotoById("0")).rejects.toHaveProperty("message", "The photo with the given id was not found")
  });

  it('findAllFotos should return all photos', async () => {
    const fotos: FotoEntity[] = await service.findAllFotos();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotoList.length);
  });

  //findAllFotos does not have a negative case

  it('deleteFoto should remove a photo', async () => {
    const foto: FotoEntity = fotoList[0];
    await service.deleteFoto(foto.id);
    const deletedFoto: FotoEntity = await repository.findOne({where:{ id: foto.id }});
    expect(deletedFoto).toBeNull();
  });

  it('deleteFoto should throw an exception for an invalid photo', async () => {
    const foto: FotoEntity = fotoList[0];
    await service.deleteFoto(foto.id);
    await expect(() => service.deleteFoto("0")).rejects.toHaveProperty("message", "The photo with the given id was not found")
  });
  
});
