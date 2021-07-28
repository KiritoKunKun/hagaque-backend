import { CategoriesRepositoryInMemory } from '@modules/categories/infra/typeorm/repositories/inMemory/CategoriesRepositoryInMemory';
import { CreateCategoryDTO } from '@modules/categories/types/CategoriesRepositoryTypes';
import { CreateCategoryService } from '../createCategory/CreateCategoryService';
import { UpdateCategoryService } from './UpdateCategoryService';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let updateCategoryService: UpdateCategoryService;
let createCategoryService: CreateCategoryService;

describe('Update Category', () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		updateCategoryService = new UpdateCategoryService(
			categoriesRepositoryInMemory
		);
		createCategoryService = new CreateCategoryService(
			categoriesRepositoryInMemory
		);
	});

	it.only('should be able to update a category', async () => {
		const category: CreateCategoryDTO = {
			name: 'Category Update Test',
		};

		const createdCategory = await createCategoryService.execute(category);

		const updatedCategory = await updateCategoryService.execute({
			id: createdCategory.id,
			name: 'Category Update Test 2',
		});

		expect(updatedCategory).not.toBe(createdCategory);
	});
});
