const API_URL = "https://fakestoreapi.com/";

// Helper function to handle HTTP requests
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Function to fetch products
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

//Fetch products by category
export const fetchProductsByCategory = async (category) => {
  return fetchData(`products/category/${category}`);
};

// Fetch categories
export const fetchCategories = async () => {
  return fetchData('products/categories');
};

//Fetch single product
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const productDetails = await response.json();
    return productDetails;
  } catch (error) {
    throw new Error('Error fetching product details by ID');
  }
};