/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { RedSocialEntity } from '../redSocial/redSocial.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];
  let redSocial: RedSocialEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuarioList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        id: faker.string.uuid(),
        nombre: faker.person.fullName(),
        telefono: faker.string.numeric({ length: { min: 10, max: 10 } }),
        redSocial: redSocial,
        fotos: [],
      });
      usuarioList.push(usuario);
    }
  };

  console.log(repository)

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUsuario should return a new user', async () => {
    const usuario: UsuarioEntity = {
      id: faker.string.uuid(),
      nombre: faker.person.fullName(),
      telefono: faker.string.numeric({ length: { min: 10, max: 10 } }),
      redSocial: redSocial,
      fotos: []
    };

    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({where: { id: newUsuario.id }});
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre);
    expect(storedUsuario.telefono).toEqual(newUsuario.telefono);
  }); 

  it('createUsuario should throw an exception for an invalid user', async () => {
    const usuario: UsuarioEntity = {
      id: faker.string.uuid(),
      nombre: faker.person.fullName(),
      telefono: faker.string.numeric({ length: { min: 1, max: 9 } }),
      redSocial: redSocial,
      fotos: []
    };

    await expect(() => service.createUsuario(usuario)).rejects.toHaveProperty("message", "Telefono was not 10 chars long");

  });

  it('findUsuarioById should return a user by id', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    const usuario: UsuarioEntity = await service.findUsuarioById(storedUsuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(storedUsuario.nombre)
    expect(usuario.telefono).toEqual(storedUsuario.telefono)
  });

  it('findUsuarioById should throw an exception for an invalid usser', async () => {
    await expect(() => service.findUsuarioById("0")).rejects.toHaveProperty("message", "The user with the given id was not found")
  });

  it('findAllUsuarios should return all users', async () => {
    const usuarios: UsuarioEntity[] = await service.findAllUsuarios();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuarioList.length);
  });

  //findAllFotos does not have a negative case

});
