import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { getRepository } from 'typeorm';
import { Product } from '../infra/typeorm/entities/Product';

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
