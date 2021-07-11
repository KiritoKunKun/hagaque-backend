import uploadConfig from '@config/upload';
import ProductImageController from '@controllers/ProductImageController';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { CreateManyProductsService } from '@services/products/CreateManyProductsService';
import { CreateProductService } from '@services/products/CreateProductService';
import { GetProductByIdService } from '@services/products/GetProductByIdService';
import { ListProductsService } from '@services/products/ListProductsService';
import UpdateProductImageService from '@services/products/UpdateProductImageService';
import { classToClass } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

const productsRouter = Router();

const productImageController = new ProductImageController();

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
	const createProductService = new CreateProductService();

	await createProductService.execute({
		product: request.body,
	});

	return response.send();
});

productsRouter.post('/list', ensureAdmin, async (request, response) => {
	const { products } = request.body;

	const createManyProductsService = new CreateManyProductsService();

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
