import { Category } from '@database/models/Category';
import { Product } from '@database/models/Product';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

interface Request {
	name: string;
	salePrice: number;
	rentPrice?: number;
	image: string;
	description: string;
	isbn?: string;
	barCode?: string;
	categoriesIds: string[];
}

class CreateProductService {
	public async execute({
		name,
		salePrice,
		rentPrice,
		image,
		description,
		isbn,
		barCode,
		categoriesIds,
	}: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.findByIds(categoriesIds);

		if (!categories?.length) {
			throw new AppError('As categorias informadas não existem.');
		}

		const productsRepository = getRepository(Product);

		const product = productsRepository.create({
			name,
			salePrice,
			rentPrice,
			image,
			description,
			isbn,
			barCode,
			categories,
		});

		await productsRepository.save(product);
	}
}

export { CreateProductService };
