import { CategoriesRepositoryInMemory } from '@modules/categories/infra/typeorm/repositories/inMemory/CategoriesRepositoryInMemory';
import { CreateCategoryDTO } from '@modules/categories/types/CategoriesRepositoryTypes';
import { CreateCategoryService } from '../createCategory/CreateCategoryService';
import { ListCategoriesService } from '../listCategories/ListCategoriesService';
import { DeleteCategoryService } from './DeleteCategoryService';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryService: CreateCategoryService;
let deleteCategoryService: DeleteCategoryService;
let listCategoriesService: ListCategoriesService;

describe('Delete Category', () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategoryService = new CreateCategoryService(
			categoriesRepositoryInMemory
		);
		deleteCategoryService = new DeleteCategoryService(
			categoriesRepositoryInMemory
		);
		listCategoriesService = new ListCategoriesService(
			categoriesRepositoryInMemory
		);
	});

	it('should be able to delete a category', async () => {
		const category: CreateCategoryDTO = {
			name: 'Category Test',
		};

		const createdCategory = await createCategoryService.execute(category);

		await deleteCategoryService.execute({ id: createdCategory.id });

		const categories = await listCategoriesService.execute();

		expect(categories).not.toContain(createdCategory);
	});
});
