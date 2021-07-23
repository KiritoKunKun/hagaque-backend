import { getRepository } from 'typeorm';
import { Category } from '../infra/typeorm/entities/Category';

class ListCategoriesService {
	public async execute(): Promise<Category[]> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.find({
			order: {
				name: 'ASC',
			},
		});

		const categoriesList = this.createCategories(categories);

		return categoriesList;
	}

	private createCategories(
		categories: Category[],
		parentId?: string
	): Category[] {
		const categoriesList: Category[] = [];

		let categoriesMap: Category[] = [];

		if (!parentId) {
			categoriesMap = categories.filter((e) => !e.parentId);
		} else {
			categoriesMap = categories.filter((e) => e.parentId === parentId);
		}

		for (let c of categoriesMap) {
			categoriesList.push({
				...c,
				children: this.createCategories(categories, c.id),
			});
		}

		return categoriesList;
	}
}

export { ListCategoriesService };
