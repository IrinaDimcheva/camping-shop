// const baseUrl = process.env.production.REACT_APP_REST_API_URL + '/api';
// const baseUrl = process.env.REACT_APP_REST_API_URL + '/api';
const baseUrl = 'https://camping-shop-rest-api-production.up.railway.app/api';

const getProducts = () => {
  return fetch(`${baseUrl}/products`).then(res => res.json());
};

const getProductsByCategory = (category) => {
  return fetch(`${baseUrl}/products/category/${category}`).then(res => res.json());
};

const getProductById = (productId) => {
  return fetch(`${baseUrl}/products/${productId}`).then(res => res.json());
};

const createProduct = (data) => {
  return fetch(`${baseUrl}/products/new`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(res => res.json());
};

const updateProduct = (productId, data) => {
  return fetch(`${baseUrl}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(res => res.json());
};

const deleteProduct = (productId) => {
  return fetch(`${baseUrl}/products/${productId}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(res => res.json());
};

export {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
