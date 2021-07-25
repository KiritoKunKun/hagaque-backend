import { uploadConfig } from '@config/upload';
import { ProductImageController } from '@modules/products/controllers/ProductImageController';
import { CreateManyProductsService } from '@modules/products/services/CreateManyProductsService';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { GetProductByIdService } from '@modules/products/services/GetProductByIdService';
import { ListProductsService } from '@modules/products/services/ListProductsService';
import { UpdateProductImageService } from '@modules/products/services/UpdateProductImageService';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { classToClass } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

const productsRouter = Router();

const productImageController = container.resolve(ProductImageController);

const upload = multer(uploadConfig.multer);

productsRouter.get('/', async (request, response) => {
	const search = request.query.search as string;
	const page = request.query.page as string;
	const limit = request.query.limit as string;

	const listProductsService = container.resolve(ListProductsService);

	const listProductsResponse = await listProductsService.execute({
		search,
		page,
		limit,
	});

	return response.json(classToClass(listProductsResponse));
});

productsRouter.get('/:id', async (request, response) => {
	const id = request.params.id;

	const getProductByIdService = container.resolve(GetProductByIdService);

	const product = await getProductByIdService.execute({
		id,
	});

	return response.json(classToClass(product));
});

productsRouter.post('/', ensureAdmin, async (request, response) => {
	const createProductService = container.resolve(CreateProductService);

	await createProductService.execute({
		product: request.body,
	});

	return response.send();
});

productsRouter.post('/list', ensureAdmin, async (request, response) => {
	const { products } = request.body;

	const createManyProductsService = container.resolve(
		CreateManyProductsService
	);

	await createManyProductsService.execute({ products });

	return response.send();
});

productsRouter.patch(
	'/image/:id',
	ensureAdmin,
	upload.single('image'),
	productImageController.update,
	async (request, response) => {
		try {
			const updateProductImageService = container.resolve(
				UpdateProductImageService
			);

			const product = await updateProductImageService.execute({
				id: request.params.id,
				imageFilename: request.file?.filename || '',
			});

			return response.json(product);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	}
);

export { productsRouter };
