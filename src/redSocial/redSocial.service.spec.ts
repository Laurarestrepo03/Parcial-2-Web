/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './redSocial.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { RedSocialEntity } from './redSocial.entity';

describe('RedSocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(getRepositoryToken(RedSocialEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createRedSocial should return a new social network', async () => {
    const redSocial: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.word(),
      slogan: faker.lorem.words(20),
      usuarios: []
    };

    const newRedSocial: RedSocialEntity = await service.createRedSocial(redSocial);
    expect(newRedSocial).not.toBeNull();

    const storedRedSocial: RedSocialEntity = await repository.findOne({where: { id: newRedSocial.id }});
    expect(storedRedSocial).not.toBeNull();
    expect(storedRedSocial.nombre).toEqual(newRedSocial.nombre);
    expect(storedRedSocial.slogan).toEqual(newRedSocial.slogan);
  });  

  it('createRedSocial should throw an exception for an invalid social network', async () => {
    const redSocial: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.word(),
      slogan: faker.lorem.word(5),
      usuarios: []
    };

    await expect(() => service.createRedSocial(redSocial)).rejects.toHaveProperty("message", "Slogan was less than 20 chars long");

  });

});
