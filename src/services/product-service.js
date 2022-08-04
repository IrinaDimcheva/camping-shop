const baseUrl = 'http://localhost:5000/api';

const getProducts = () => {
  return fetch(`${baseUrl}/products`).then(res => res.json());
};

const getProductsByCategory = (category) => {
  return fetch(`${baseUrl}/products/${category}`).then(res => res.json());
}

const getProductById = (productId) => {
  return fetch(`${baseUrl}/products/${productId}`).then(res => res.json());
}

export {
  getProducts,
  getProductsByCategory,
  getProductById
}