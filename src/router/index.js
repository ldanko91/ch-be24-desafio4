import productsController from '../controllers/products.controller.js';
import cartsController from '../controllers/carts.controller.js';

const router = app => {
    app.use('/api/products', productsController),
    app.use('/api/carts', cartsController)
}

export default router