const API_URL = "https://fakestoreapi.com/";

export const fetchProducts = async () => {
  try {
    const rsp = await fetch(`${API_URL}products`);
    
    if (!rsp.ok) {
      throw new Error('Failed to fetch products');
    }

    const json = await rsp.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${productId}`);
    }

    const product = await response.json();
    return product;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};
