const baseUrl = process.env.REACT_APP_REST_API_URL;

const createOrder = (data) => {
  return fetch(`${baseUrl}/orders/new`, {
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