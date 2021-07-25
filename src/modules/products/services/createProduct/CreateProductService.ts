import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import { Product } from '../infra/typeorm/entities/Product';
import { IProductsRepository } from '../types/ProductsRepositoryTypes';

interface Request {
	product: Product;
}

@injectable()
class CreateProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository
	) {}

	public async execute({ product }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.findByIds(
			product.categories
		);

		await this.productsRepository.create({
			...product,
			categories,
		});
	}
}

export { CreateProductService };
