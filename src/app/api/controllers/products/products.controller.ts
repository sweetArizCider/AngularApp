import Products from "@app/api/sequelize/models/Products.model";
import { ProductAttributes , ProductPayload } from '@expressModels/products/products';


export const addProduct = async (product: ProductPayload): Promise<ProductAttributes> => {
  return await Products.create( product );
}

export const getProducts = async (): Promise<ProductAttributes[]> => {
  return await Products.findAll();
}

export const removeProduct = async (productId: number): Promise<void> => {
  const product = await Products.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  await product.destroy();
  return;
}
