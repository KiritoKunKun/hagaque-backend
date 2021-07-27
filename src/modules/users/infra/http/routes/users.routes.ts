import { CreateUserService } from '@modules/users/services/createUserService/CreateUserService';
import { Router } from 'express';
import { container } from 'tsyringe';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
	const {
		adminSecret,
		isAdmin,
		name,
		email,
		password,
		passwordConfirmation,
	} = request.body;

	const createUserService = container.resolve(CreateUserService);

	const user = await createUserService.execute({
		adminSecret,
		isAdmin,
		name,
		email,
		password,
		passwordConfirmation,
	});

	return response.status(200).json(user);
});

export { usersRouter };
