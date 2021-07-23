import {
	CreateUserDTO,
	IUsersRepository,
} from '@modules/users/types/UsersRepositoryTypes';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public findById = async (id: string): Promise<User | undefined> => {
		const user = await this.ormRepository.findOne(id);

		return user;
	};

	public findByEmail = async (email: string): Promise<User | undefined> => {
		const user = await this.ormRepository.findOne({ where: { email } });

		return user;
	};

	public create = async (data: CreateUserDTO): Promise<User> => {
		const user = this.ormRepository.create(data);

		await this.ormRepository.save(user);

		return user;
	};

	public save = async (user: User): Promise<User> => {
		return this.ormRepository.save(user);
	};
}

export { UsersRepository };
