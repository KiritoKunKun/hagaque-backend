import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { CreateCategoryService } from '../services/categories/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.post('/', ensureAdmin, async (request, response) => {
	const { name, parentId } = request.body;

	const createCategoryService = new CreateCategoryService();

	await createCategoryService.execute({ name, parentId });

	return response.status(201).send();
});

export { categoriesRouter };
