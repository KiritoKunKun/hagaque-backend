import { Category } from '@database/models/Category';
import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

interface Request {
	id: string;
	name: string;
}

class UpdateCategoryService {
	public async execute({ id, name }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const nameAlreadyExists = await categoriesRepository
			.createQueryBuilder('category')
			.where('category."id" != :id', { id })
			.andWhere('category."name" = :name', { name })
			.getOne();

		if (nameAlreadyExists) {
			throw new AppError('Esse nome já está em uso.');
		}

		const category = await categoriesRepository.findOne(id);

		if (!category) {
			throw new AppError('Essa categoria não existe.', 404);
		}

		category.name = name;

		await categoriesRepository.save(category);
	}
}

export { UpdateCategoryService };
