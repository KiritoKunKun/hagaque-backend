import { authConfig } from '@config/auth';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/types/UsersRepositoryTypes';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({ email, password }: Request): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Usuário ou senha inválidos.', 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError('Usuário ou senha inválidos.', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret ? secret : '', {
			subject: user.id,
			expiresIn,
		});

		return {
			user,
			token,
		};
	}
}

export { AuthenticateUserService };
