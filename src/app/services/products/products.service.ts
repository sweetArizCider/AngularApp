import { ProductAttributes , ProductPayload } from "@app/api/models/products";
import { config } from "dotenv"

config();

const API_BASE_URL = process.env['API_BASE_URL'] + 'products';

export const getProducts = async (): Promise<ProductAttributes[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    return await response.json();
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

    const response = await fetch(API_BASE_URL, requestOptions);
    if(response.status === 400) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    if(response.status === 500) {
      throw new Error('Internal Server Error! :(');
    }
    return await response.json();
  }catch (error) {
    console.error('Service Error:', error);
    throw error;
  }
}

export const removeProduct = async (productId: number): Promise<string> => {

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (isNaN(productId)) {
    throw new Error('Invalid product ID');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${productId}`, requestOptions);
    const jsonResponse = await response.json();

    if (response.status === 400) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    if (response.status === 500) {
      throw new Error('Internal Server Error! :(');
    }

    return jsonResponse.message;
  } catch (error) {
    console.error('Service Error:', error);
    throw error;
  }
}
