import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/types/CategoriesRepositoryTypes';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCategoriesService {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute(): Promise<Category[]> {
		const categories = await this.categoriesRepository.list();

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
