import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
	findById: (id: string) => Promise<User | undefined>;
	findByEmail: (email: string) => Promise<User | undefined>;
	create: (data: CreateUserDTO) => Promise<User>;
	save: (user: User) => Promise<User>;
}

export interface CreateUserDTO {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}
