import { Router } from 'express';
import { RefreshTokenService } from 'src/services/users/RefreshTokenService';
import AuthenticateUserService from '../services/users/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const authenticateUser = new AuthenticateUserService();

	const { user, token } = await authenticateUser.execute({
		email,
		password,
	});

	// @ts-ignore
	delete user.password;

	return response.json({ user, token });
});

sessionsRouter.post('/refresh', async (request, response) => {
	const refreshTokenService = new RefreshTokenService();

	const newToken = await refreshTokenService.execute({
		authHeader: request.headers.authorization,
	});

	return response.json(newToken);
});

export default sessionsRouter;
