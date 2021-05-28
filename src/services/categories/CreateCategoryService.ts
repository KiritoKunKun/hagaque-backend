import { Category } from '@database/models/Category';
import { getRepository } from 'typeorm';

interface Request {
	name: string;
	parentId?: string;
}

class CreateCategoryService {
	public async execute({ name, parentId }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const category = categoriesRepository.create({
			name,
			parentId,
		});

		await categoriesRepository.save(category);
	}
}

export { CreateCategoryService };
