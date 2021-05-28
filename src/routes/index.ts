import { Router } from 'express';
import { categoriesRouter } from './categories.routes';
import { productsRouter } from './products.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
