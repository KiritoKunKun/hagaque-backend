import { Category } from '@modules/categories/infra/typeorm/entities/Category';

export interface ICategoriesRepository {
	list: () => Promise<Category[]>;
	findById: (id: string) => Promise<Category | undefined>;
	findByParentId: (parentId: string) => Promise<Category | undefined>;
	findByName: (name: string) => Promise<Category | undefined>;
	create: (category: CreateCategoryDTO) => Promise<Category>;
	save: (category: Category) => Promise<Category>;
	delete: (id: string) => Promise<void>;
	checkIfCategoryNameExist: (
		params: CheckIfCategoryNameExistParams
	) => Promise<boolean>;
}

export interface ListCategoriesParams {
	search?: string;
	page?: string;
	limit?: string;
}

export interface CheckIfCategoryNameExistParams {
	id: string;
	name: string;
}

export interface CreateCategoryDTO {
	name: string;
	parentId?: string;
}
