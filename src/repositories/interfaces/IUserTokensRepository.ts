import UserToken from "../../database/models/UserToken";

export default interface IUserTokensRepository {
	generate(user_id: string): Promise<UserToken>;
	findByToken(token: string): Promise<UserToken | undefined>;
	deleteToken(token: string): Promise<void>;
}
