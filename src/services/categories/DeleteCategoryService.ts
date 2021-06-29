import { Category } from '@database/models/Category';
import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

interface Request {
	id: string;
}

class DeleteCategoryService {
	public async execute({ id }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const category = await categoriesRepository.findOne(id);

		if (!category) {
			throw new AppError('Essa categoria não existe.');
		}

		await this.deleteChildren(id);

		await categoriesRepository.delete(id);
	}

	private async deleteChildren(id: string) {
		const categoriesRepository = getRepository(Category);

		const category = await categoriesRepository.findOne({
			parentId: id,
		});

		if (category) {
			await this.deleteChildren(category.id);
		}

		await categoriesRepository.delete(id);
	}
}

export { DeleteCategoryService };
