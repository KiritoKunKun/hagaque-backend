import { ICategoriesRepository } from '@modules/categories/types/CategoriesRepositoryTypes';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
	id: string;
	name: string;
}

@injectable()
class UpdateCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute({ id, name }: Request): Promise<void> {
		const nameAlreadyExists =
			await this.categoriesRepository.checkIfCategoryNameExist({
				id,
				name,
			});

		if (nameAlreadyExists) {
			throw new AppError('Esse nome já está em uso.');
		}

		const category = await this.categoriesRepository.findById(id);

		if (!category) {
			throw new AppError('Essa categoria não existe.', 404);
		}

		category.name = name;

		await this.categoriesRepository.save(category);
	}
}

export { UpdateCategoryService };
