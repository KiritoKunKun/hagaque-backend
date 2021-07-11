import { Category } from '@database/models/Category';
import { Product } from '@database/models/Product';
import { getRepository } from 'typeorm';

interface Request {
	product: Product;
}

class CreateProductService {
	public async execute({ product }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.findByIds(
			product.categories
		);

		const productsRepository = getRepository(Product);

		const newProduct = productsRepository.create({
			...product,
			categories,
		});

		await productsRepository.save(newProduct);
	}
}

export { CreateProductService };
