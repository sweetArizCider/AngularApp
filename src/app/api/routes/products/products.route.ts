import Router from 'express';
import { Request, Response } from 'express';
import { addProduct } from '@expressControllers/products/products.controller';
import { ProductPayload } from '@expressModels/products';
const router = Router();

router.post('/products', async (req: Request, res: Response) => {
  try {
    const productPayload: ProductPayload = req.body;
    const newProduct = await addProduct(productPayload);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
})

export default router;