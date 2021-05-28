import { Router } from 'express';

const productsRouter = Router();

productsRouter.post('/', async (request, response) => {
	return response.send();
});

export { productsRouter };
