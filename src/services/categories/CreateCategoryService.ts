import { Category } from '@database/models/Category';
import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

interface Request {
	name: string;
	parentId?: string;
}

class CreateCategoryService {
	public async execute({ name, parentId }: Request): Promise<Category> {
		const categoriesRepository = getRepository(Category);

		const categoryAlreadyExists = await categoriesRepository.findOne({
			where: {
				name,
			},
		});

		if (categoryAlreadyExists) {
			throw new AppError('Essa categoria já existe.');
		}

		const category = categoriesRepository.create({
			name,
			parentId,
		});

		await categoriesRepository.save(category);

		return category;
	}
}

export { CreateCategoryService };
