import { CategoriesRepositoryInMemory } from '@modules/categories/infra/typeorm/repositories/inMemory/CategoriesRepositoryInMemory';
import { ListCategoriesService } from './ListCategoriesService';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesService: ListCategoriesService;

describe('List Categories', () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		listCategoriesService = new ListCategoriesService(
			categoriesRepositoryInMemory
		);
	});

	it('should be able to list all categories', async () => {
		await listCategoriesService.execute();

		const categories = await categoriesRepositoryInMemory.list();

		expect(categories);
	});
});
