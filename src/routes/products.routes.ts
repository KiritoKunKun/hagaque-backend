import { Router } from 'express';
import { ensureAdmin } from 'src/middlewares/ensureAdmin';
import { CreateProductService } from 'src/services/products/CreateProductService';

const productsRouter = Router();

productsRouter.post('/', ensureAdmin, async (request, response) => {
	const {
		name,
		salePrice,
		rentPrice,
		image,
		description,
		isbn,
		barCode,
		categories,
	} = request.body;

	const createProductService = new CreateProductService();

	await createProductService.execute({
		name,
		salePrice,
		rentPrice,
		image,
		description,
		isbn,
		barCode,
		categories,
	});

	return response.send();
});

export { productsRouter };
