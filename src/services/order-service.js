const baseUrl = 'http://localhost:5000/api/orders';

const createOrder = (data) => {
  return fetch(`${baseUrl}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(res => res.json());
};

export {
  createOrder
};