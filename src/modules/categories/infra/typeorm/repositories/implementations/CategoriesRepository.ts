import {
	CheckIfCategoryExistParams,
	ICategoriesRepository,
} from '@modules/categories/types/CategoriesRepositoryTypes';
import { CreateManyProductsDTO } from '@modules/products/types/ProductsRepositoryTypes';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
	private ormRepository: Repository<Category>;

	constructor() {
		this.ormRepository = getRepository(Category);
	}

	public list = async (): Promise<Category[]> => {
		const categories = await this.ormRepository
			.createQueryBuilder()
			.orderBy('name', 'ASC')
			.getMany();

		return categories;
	};

	public findById = async (id: string): Promise<Category | undefined> => {
		const product = await this.ormRepository.findOne(id);

		return product;
	};

	public findByParentId = async (
		parentId: string
	): Promise<Category | undefined> => {
		const product = await this.ormRepository.findOne({
			where: { parentId },
		});

		return product;
	};

	public findByName = async (name: string): Promise<Category | undefined> => {
		const product = await this.ormRepository.findOne({ where: { name } });

		return product;
	};

	public create = async (data: Category): Promise<Category> => {
		const product = this.ormRepository.create(data);

		await this.ormRepository.save(product);

		return product;
	};

	public createMany = async (
		data: CreateManyProductsDTO[]
	): Promise<Category[]> => {
		const products = this.ormRepository.create(data);

		await this.ormRepository.save(products);

		return products;
	};

	public save = async (category: Category): Promise<Category> => {
		return this.ormRepository.save(category);
	};

	public delete = async (id: string): Promise<void> => {
		await this.ormRepository.delete(id);
	};

	public checkIfCategoryExist = async ({
		id,
		name,
	}: CheckIfCategoryExistParams): Promise<boolean> => {
		const category = await this.ormRepository
			.createQueryBuilder('category')
			.where('category."id" != :id', { id })
			.andWhere('category."name" = :name', { name })
			.getOne();

		return !!category;
	};
}

export { CategoriesRepository };
