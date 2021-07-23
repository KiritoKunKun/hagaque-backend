import { CreateCategoryService } from '@modules/categories/services/CreateCategoryService';
import { DeleteCategoryService } from '@modules/categories/services/DeleteCategoryService';
import { ListCategoriesService } from '@modules/categories/services/ListCategoriesService';
import { UpdateCategoryService } from '@modules/categories/services/UpdateCategoryService';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { Router } from 'express';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
	const listCategoriesService = new ListCategoriesService();

	const categories = await listCategoriesService.execute();

	return response.json(categories);
});

categoriesRouter.post('/', ensureAdmin, async (request, response) => {
	const { name, parentId } = request.body;

	const createCategoryService = new CreateCategoryService();

	const category = await createCategoryService.execute({ name, parentId });

	return response.status(201).json(category);
});

categoriesRouter.put('/:id', ensureAdmin, async (request, response) => {
	const { id } = request.params;
	const { name } = request.body;

	const updateCategoryService = new UpdateCategoryService();

	await updateCategoryService.execute({ id, name });

	return response.send();
});

categoriesRouter.delete('/:id', ensureAdmin, async (request, response) => {
	const { id } = request.params;

	const deleteCategoryService = new DeleteCategoryService();

	await deleteCategoryService.execute({ id });

	return response.send();
});

export { categoriesRouter };
