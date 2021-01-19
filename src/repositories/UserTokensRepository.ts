import UserToken from "../database/models/UserToken";
import IUserTokensRepository from "./interfaces/IUserTokensRepository";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

class UserTokensRepository implements IUserTokensRepository {
	public async generate(user_id: string): Promise<UserToken> {
		const userTokensRepository = getRepository(UserToken);

		const userToken = userTokensRepository.create({
			user_id,
		});

		await userTokensRepository.save(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userTokensRepository = getRepository(UserToken);

		const userToken = userTokensRepository.findOne({
			where: {
				token,
			},
		});

		return userToken;
	}

	public async deleteToken(token: string): Promise<void> {
		const userTokensRepository = getRepository(UserToken);

		const userToken = await userTokensRepository.findOne({
			where: {
				token,
			},
		});

		if (!userToken) {
			throw new AppError("User token does not exists");
		}

		await userTokensRepository.delete({
			id: userToken.id,
		});
	}
}

export default UserTokensRepository;
