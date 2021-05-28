import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { CreateCategoryService } from '../services/categories/CreateCategoryService';
import { DeleteCategoryService } from '../services/categories/DeleteCategoryService';
import { ListCategoriesService } from '../services/categories/ListCategoriesService';
import { UpdateCategoryService } from '../services/categories/UpdateCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
	const listCategoriesService = new ListCategoriesService();

	const categories = await listCategoriesService.execute();

	return response.json(categories);
});

categoriesRouter.post('/', ensureAdmin, async (request, response) => {
	const { name, parentId } = request.body;

	const createCategoryService = new CreateCategoryService();

	await createCategoryService.execute({ name, parentId });

	return response.status(201).send();
});

categoriesRouter.put('/', ensureAdmin, async (request, response) => {
	const { id, name } = request.body;

	const updateCategoryService = new UpdateCategoryService();

	await updateCategoryService.execute({ id, name });

	return response.send();
});

categoriesRouter.delete('/', ensureAdmin, async (request, response) => {
	const { id } = request.body;

	const deleteCategoryService = new DeleteCategoryService();

	await deleteCategoryService.execute({ id });

	return response.send();
});

export { categoriesRouter };
