import Router from 'express';
import { Request, Response } from 'express';
import { addProduct, getProducts, removeProduct } from '@expressControllers/products/products.controller';
import { ProductPayload } from '@expressModels/products/products';
import productValidator from '@joiSchemas/products/products.joi'
import { authMiddleware } from '@expressMiddleware/auth/auth.middleware';


const router = Router();

router.post('/products', authMiddleware , async (req: Request, res: Response): Promise<void> => {
  try {
    const productPayload: ProductPayload = req.body;
    const { error } = productValidator.validate(productPayload);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return
    }
    const newProduct = await addProduct(productPayload);
    res.status(201).json(newProduct);
    return

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error! :(' });
    return
  }
})

router.get('/products', authMiddleware , async (_, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error! :(' });
  }
});

router.delete('/products/:id', authMiddleware , async (req: Request, res: Response): Promise<void> => {
  try {

    const productId = Number(req.params['id']);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }
    await removeProduct(productId);
    res.status(204).json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error! :(' });
  }
});

export default router;
