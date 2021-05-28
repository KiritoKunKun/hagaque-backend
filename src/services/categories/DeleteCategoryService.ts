import { Category } from '@database/models/Category';
import { getRepository } from 'typeorm';

interface Request {
	id: string;
}

class DeleteCategoryService {
	public async execute({ id }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		await categoriesRepository.delete(id);

		await categoriesRepository.delete({
			parentId: id,
		});
	}
}

export { DeleteCategoryService };
