import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../config/auth";
import AppError from "../../errors/AppError";
import User from "../../database/models/User";

interface Request {
	username: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

class AuthenticateUserService {
	public async execute({ username, password }: Request): Promise<Response> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({ where: { username } });

		if (!user) {
			throw new AppError("Este usuário não existe.", 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError("Usuário ou senha inválidos.", 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret ? secret : "", {
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
