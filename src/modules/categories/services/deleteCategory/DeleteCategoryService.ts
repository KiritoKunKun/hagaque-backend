import { ICategoriesRepository } from '@modules/categories/types/CategoriesRepositoryTypes';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
	id: string;
}

@injectable()
class DeleteCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute({ id }: Request): Promise<void> {
		const category = await this.categoriesRepository.findById(id);

		if (!category) {
			throw new AppError('Essa categoria não existe.');
		}

		await this.deleteChildren(id);

		await this.categoriesRepository.delete(id);
	}

	private async deleteChildren(id: string) {
		const category = await this.categoriesRepository.findByParentId(id);

		if (category) {
			await this.deleteChildren(category.id);
		}

		await this.categoriesRepository.delete(id);
	}
}

export { DeleteCategoryService };
