import { Router } from 'express';
import CreateUserService from '../services/users/CreateUserService';

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

	const createUserService = new CreateUserService();

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

export default usersRouter;
