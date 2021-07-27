import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/types/UsersRepositoryTypes';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface Request {
	adminSecret?: string;
	isAdmin?: boolean;
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({
		adminSecret,
		isAdmin,
		name,
		email,
		password,
		passwordConfirmation,
	}: Request): Promise<User> {
		if (isAdmin) {
			if (!adminSecret) {
				throw new AppError('Admin secret não informado.');
			}

			if (adminSecret !== process.env.ADMIN_SECRET) {
				throw new AppError('Admin secret está incorreto.');
			}
		}

		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('E-mail já cadastrado.');
		}

		if (password !== passwordConfirmation) {
			throw new AppError('Password does not match.');
		}

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({
			isAdmin,
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export { CreateUserService };
