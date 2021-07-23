import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/types/UsersRepositoryTypes';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
);
