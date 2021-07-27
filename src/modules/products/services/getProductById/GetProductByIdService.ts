import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/types/ProductsRepositoryTypes';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
	id: string;
}

@injectable()
class GetProductByIdService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository
	) {}

	public async execute({ id }: Request): Promise<Product> {
		const product = await this.productsRepository.findById(id);

		if (!product) {
			throw new AppError('Esse produto não existe.');
		}

		return product;
	}
}

export { GetProductByIdService };
