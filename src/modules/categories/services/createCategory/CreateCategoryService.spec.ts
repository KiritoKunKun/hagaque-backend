import { CategoriesRepositoryInMemory } from '@modules/categories/infra/typeorm/repositories/inMemory/CategoriesRepositoryInMemory';
import { CreateCategoryDTO } from '@modules/categories/types/CategoriesRepositoryTypes';
import { CreateCategoryService } from './CreateCategoryService';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryService: CreateCategoryService;

describe('Create Category', () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategoryService = new CreateCategoryService(
			categoriesRepositoryInMemory
		);
	});

	it('should be able to create a new category', async () => {
		const category: CreateCategoryDTO = {
			name: 'Category Test',
		};

		await createCategoryService.execute(category);

		const createdCategory = await categoriesRepositoryInMemory.findByName(
			category.name
		);

		expect(createdCategory).toHaveProperty('id');
	});
});
