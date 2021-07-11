import { Product } from '@database/models/Product';
import { getRepository, Like } from 'typeorm';

interface Request {
	search?: string;
	page?: string;
	limit?: string;
}

interface Response {
	products: Product[];
	total: number;
}

class ListProductsService {
	public async execute({
		search = '',
		page,
		limit,
	}: Request): Promise<Response> {
		const productsRepository = getRepository(Product);

		const [products, total] = await productsRepository
			.createQueryBuilder()
			.where('LOWER(name) LIKE LOWER(:search)', {
				search: `%${search.toLowerCase()}%`,
			})
			.limit(limit && Number(limit))
			.offset(page && Number(page))
			.getManyAndCount();

		return {
			products,
			total,
		};
	}
}

export { ListProductsService };
