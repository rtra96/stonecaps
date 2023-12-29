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
