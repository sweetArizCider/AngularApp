import Products from "@app/api/sequelize/models/Products.model";
import { ProductPayload, ProductAttributes } from '@expressModels/products';


export const addProduct = async (product: ProductPayload): Promise<ProductAttributes> => {
  const newProduct = await Products.create(product)
  return newProduct;
}

export const getProducts = async (): Promise<ProductAttributes[]> => {
  const products = await Products.findAll();
  return products;
}