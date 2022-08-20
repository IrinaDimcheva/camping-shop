const baseUrl = process.env.REACT_APP_REST_API_URL;

const getCart = () => {
  return fetch(`${baseUrl}/user/cart`, {
    credentials: 'include'
  }).then(res => res.json());
};

const addToCart = (productId, amount) => {
  const data = {
    productId,
    amount
  };
  return fetch(`${baseUrl}/user/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(res => res.json());
};

const removeFromCart = (productId) => {
  return fetch(`${baseUrl}/user/cart/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productId),
    credentials: 'include'
  }).then(res => res.json());
};

const getFavorites = () => {
  return fetch(`${baseUrl}/user/favorites`, {
    credentials: 'include'
  }).then(res => res.json());
};

const addToFavorites = (productId) => {
  return fetch(`${baseUrl}/user/favorites/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productId),
    credentials: 'include'
  }).then(res => res.json());
};

const removeFromFavorites = (productId) => {
  return fetch(`${baseUrl}/user/favorites/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productId),
    credentials: 'include'
  }).then(res => res.json());
};

export {
  getCart,
  addToCart,
  removeFromCart,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
};