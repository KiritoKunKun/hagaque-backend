import { CreateCategoryService } from '@modules/categories/services/createCategory/CreateCategoryService';
import { DeleteCategoryService } from '@modules/categories/services/deleteCategory/DeleteCategoryService';
import { ListCategoriesService } from '@modules/categories/services/listCategories/ListCategoriesService';
import { UpdateCategoryService } from '@modules/categories/services/updateCategory/UpdateCategoryService';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { Router } from 'express';
import { container } from 'tsyringe';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
	const listCategoriesService = container.resolve(ListCategoriesService);

	const categories = await listCategoriesService.execute();

	return response.json(categories);
});

categoriesRouter.post('/', ensureAdmin, async (request, response) => {
	const { name, parentId } = request.body;

	const createCategoryService = container.resolve(CreateCategoryService);

	const category = await createCategoryService.execute({ name, parentId });

	return response.status(201).json(category);
});

categoriesRouter.put('/:id', ensureAdmin, async (request, response) => {
	const { id } = request.params;
	const { name } = request.body;

	const updateCategoryService = container.resolve(UpdateCategoryService);

	await updateCategoryService.execute({ id, name });

	return response.send();
});

categoriesRouter.delete('/:id', ensureAdmin, async (request, response) => {
	const { id } = request.params;

	const deleteCategoryService = container.resolve(DeleteCategoryService);

	await deleteCategoryService.execute({ id });

	return response.send();
});

export { categoriesRouter };
