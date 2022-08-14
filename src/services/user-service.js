const baseUrl = 'http://localhost:5000/api/user';

const getCart = () => {
  return fetch(`${baseUrl}/cart`, {
    credentials: 'include'
  }).then(res => res.json());
};

const addToCart = (productId, amount) => {
  const data = {
    productId,
    amount
  };
  return fetch(`${baseUrl}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(res => res.json());
};

const removeFromCart = (productId) => {
  return fetch(`${baseUrl}/cart/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productId),
    credentials: 'include'
  }).then(res => res.json());
};

const getFavorites = () => {
  return fetch(`${baseUrl}/favorites`, {
    credentials: 'include'
  }).then(res => res.json());
};

const addToFavorites = (productId) => {
  return fetch(`${baseUrl}/favorites/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productId),
    credentials: 'include'
  }).then(res => res.json());
};

const removeFromFavorites = (productId) => {
  return fetch(`${baseUrl}/favorites/remove`, {
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
  removeFromFavorites
};