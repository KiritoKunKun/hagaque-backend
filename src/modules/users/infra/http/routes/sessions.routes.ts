import { AuthenticateUserService } from '@modules/users/services/authenticateUserService/AuthenticateUserService';
import { RefreshTokenService } from '@modules/users/services/refreshTokenService/RefreshTokenService';
import { Router } from 'express';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const authenticateUser = container.resolve(AuthenticateUserService);

	const { user, token } = await authenticateUser.execute({
		email,
		password,
	});

	delete user.password;

	return response.json({ user, token });
});

sessionsRouter.post('/refresh', async (request, response) => {
	const refreshTokenService = container.resolve(RefreshTokenService);

	const newToken = await refreshTokenService.execute({
		authHeader: request.headers.authorization,
	});

	return response.json(newToken);
});

export { sessionsRouter };
