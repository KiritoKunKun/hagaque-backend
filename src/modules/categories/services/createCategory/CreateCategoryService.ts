import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/types/CategoriesRepositoryTypes';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
	name: string;
	parentId?: string;
}

@injectable()
class CreateCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute({ name, parentId }: Request): Promise<Category> {
		const categoryAlreadyExists =
			await this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new AppError('Essa categoria já existe.');
		}

		const category = await this.categoriesRepository.create({
			name,
			parentId,
		});

		return category;
	}
}

export { CreateCategoryService };
