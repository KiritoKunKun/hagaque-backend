import User from '../../database/models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../../errors/AppError';

interface Request {
	adminSecret?: string;
	isAdmin?: boolean;
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

class CreateUserService {
	public async execute({
		adminSecret,
		isAdmin,
		name,
		email,
		password,
		passwordConfirmation,
	}: Request): Promise<User> {
		const userRepository = getRepository(User);

		if (isAdmin) {
			if (!adminSecret) {
				throw new AppError('Admin secret não informado.');
			}

			if (adminSecret !== process.env.ADMIN_SECRET) {
				throw new AppError('Admin secret está incorreto.');
			}
		}

		const checkUserExists = await userRepository.findOne({
			where: { email },
		});

		if (checkUserExists) {
			throw new AppError('E-mail já cadastrado.');
		}

		if (password !== passwordConfirmation) {
			throw new AppError('Password does not match.');
		}

		const hashedPassword = await hash(password, 8);

		const user = userRepository.create({
			isAdmin,
			name,
			email,
			password: hashedPassword,
		});

		await userRepository.save(user);

		return user;
	}
}

export default CreateUserService;
