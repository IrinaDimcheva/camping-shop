const baseUrl = 'http://localhost:5000/api';

const getAll = () => {
  return fetch(`${baseUrl}/products`).then(res => res.json());
}

export {
  getAll
}