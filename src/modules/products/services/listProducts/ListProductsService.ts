import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/types/ProductsRepositoryTypes';
import { inject, injectable } from 'tsyringe';

interface Request {
	search?: string;
	page?: string;
	limit?: string;
}

interface Response {
	products: Product[];
	total: number;
}

@injectable()
class ListProductsService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository
	) {}

	public async execute(params: Request): Promise<Response> {
		const [products, total] = await this.productsRepository.list(params);

		return {
			products,
			total,
		};
	}
}

export { ListProductsService };
