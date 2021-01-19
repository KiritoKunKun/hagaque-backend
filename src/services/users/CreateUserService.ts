import User from "../../database/models/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

interface Request {
	adminSecret: string;
	username: string;
	password: string;
	passwordConfirmation: string;
}

class CreateUserService {
	public async execute({
		adminSecret,
		username,
		password,
		passwordConfirmation,
	}: Request): Promise<User> {
		const userRepository = getRepository(User);

		if (!adminSecret) {
			throw new AppError("Admin secret was not provided.");
		}

		if (adminSecret !== process.env.ADMIN_SECRET) {
			throw new AppError("Admin secret is incorrect.");
		}

		const checkUserExists = await userRepository.findOne({
			where: { username },
		});

		if (checkUserExists) {
			throw new AppError("Username already exists.");
		}

		if (password !== passwordConfirmation) {
			throw new AppError("Password does not match.");
		}

		const hashedPassword = await hash(password, 8);

		const user = userRepository.create({
			username,
			password: hashedPassword,
		});

		await userRepository.save(user);

		return user;
	}
}

export default CreateUserService;
