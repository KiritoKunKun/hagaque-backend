import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../../config/auth';
import User from '../../database/models/User';
import AppError from '../../errors/AppError';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

class AuthenticateUserService {
	public async execute({ email, password }: Request): Promise<Response> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({ where: { email } });

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

export default AuthenticateUserService;
