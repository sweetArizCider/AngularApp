import { ProductAttributes, ProductPayload } from "@app/api/models/products";

export const getProducts = async (): Promise<ProductAttributes[]> => {
  try {
    const response = await fetch('http://localhost:4200/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const addProduct = async (productPayload: ProductPayload): Promise<ProductAttributes> => {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productPayload),
    }

    const response = await fetch('http://localhost:4200/api/products', requestOptions);
    if(response.status === 400) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    if(response.status === 500) {
      throw new Error('Internal Server Error! :(');
    }
    const data = await response.json();
    return data;
  }catch (error) {
    console.error('Service Error:', error);
    throw error;
  }
}