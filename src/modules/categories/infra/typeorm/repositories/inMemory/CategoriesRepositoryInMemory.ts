import {
	CheckIfCategoryNameExistParams,
	CreateCategoryDTO,
	ICategoriesRepository,
} from '@modules/categories/types/CategoriesRepositoryTypes';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../entities/Category';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	categories: Category[] = [];

	list = async (): Promise<Category[]> => {
		return this.categories;
	};

	findById = async (id: string): Promise<Category | undefined> => {
		const category = this.categories.find((e) => e.id === id);
		return category;
	};

	findByParentId = async (
		parentId: string
	): Promise<Category | undefined> => {
		const category = this.categories.find((e) => e.parentId === parentId);
		return category;
	};

	findByName = async (name: string): Promise<Category | undefined> => {
		const category = this.categories.find((e) => e.name === name);
		return category;
	};

	create = async ({
		name,
		parentId,
	}: CreateCategoryDTO): Promise<Category> => {
		const category = new Category();

		Object.assign(category, {
			id: uuidv4(),
			name,
			parentId,
		});

		this.categories.push(category);

		return category;
	};

	save = async (category: Category): Promise<Category> => {
		this.categories.push(category);

		return category;
	};

	delete = async (id: string): Promise<void> => {
		const categories = this.categories.filter(
			(category) => category.id !== id
		);

		this.categories = categories;
	};

	checkIfCategoryNameExist = async ({
		id,
		name,
	}: CheckIfCategoryNameExistParams): Promise<boolean> => {
		const category = this.categories.find(
			(e) => e.id !== id && e.name === name
		);

		return !!category;
	};
}

export { CategoriesRepositoryInMemory };
