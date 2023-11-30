/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        id: faker.datatype.uuid(),
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titutlo: faker.string.sample()
      });
      albumList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('delete should remove an album', async () => {
    const album: AlbumEntity = albumList[0];
    await service.deleteAlbum(album.id);
    const deletedAlbum: AlbumEntity = await repository.findOne({where:{ id: album.id }});
    expect(deletedAlbum).toBeNull();
  });

});
