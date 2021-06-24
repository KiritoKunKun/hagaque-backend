import { Category } from '@database/models/Category';
import { Product } from '@database/models/Product';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

interface Request {
	products: {
		name: string;
		salePrice: number;
		rentPrice?: number;
		image: string;
		description: string;
		isbn?: string;
		barCode?: string;
		categoriesNames: string[];
	}[];
}

class CreateManyProductsService {
	public async execute({ products }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.find();

		const productsRepository = getRepository(Product);

		const productsEntities = productsRepository.create(
			products.map((product) => ({
				...product,
				categories: categories.filter((category) =>
					product.categoriesNames
						.map((categoryName) => categoryName.toLowerCase())
						.includes(category.name.toLowerCase())
				),
			}))
		);

		await productsRepository.save(productsEntities);
	}
}

export { CreateManyProductsService };
