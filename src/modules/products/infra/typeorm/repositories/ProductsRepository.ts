import {
	CreateManyProductsDTO,
	IProductsRepository,
	ListProductsParams,
} from '@modules/products/types/ProductsRepositoryTypes';
import { getRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
	private ormRepository: Repository<Product>;

	constructor() {
		this.ormRepository = getRepository(Product);
	}

	public list = async ({
		search = '',
		page,
		limit,
	}: ListProductsParams): Promise<[Product[], number]> => {
		const [products, total] = await this.ormRepository
			.createQueryBuilder()
			.where('LOWER(name) LIKE LOWER(:search)', {
				search: `%${search.toLowerCase()}%`,
			})
			.limit(limit && Number(limit))
			.offset(page && Number(page))
			.getManyAndCount();

		return [products, total];
	};

	public findById = async (id: string): Promise<Product | undefined> => {
		const product = await this.ormRepository.findOne(id);

		return product;
	};

	public create = async (data: Product): Promise<Product> => {
		const product = this.ormRepository.create(data);

		await this.ormRepository.save(product);

		return product;
	};

	public createMany = async (
		data: CreateManyProductsDTO[]
	): Promise<Product[]> => {
		const products = this.ormRepository.create(data);

		await this.ormRepository.save(products);

		return products;
	};

	public save = async (product: Product): Promise<Product> => {
		return this.ormRepository.save(product);
	};
}

export { ProductsRepository };
