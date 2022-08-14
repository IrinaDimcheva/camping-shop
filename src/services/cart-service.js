// const baseUrl = 'http://localhost:5000/api/cart';

// const getCart = () => {
//   return fetch(`${baseUrl}`, {
//     credentials: 'include'
//   }).then(res => res.json());
// };

// const addToCart = (productId, quantity) => {
//   return fetch(`${baseUrl}/add`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ productId, quantity }),
//     credentials: 'include'
//   }).then(res => res.json());
// };

// const removeFromCart = (productId) => {
//   return fetch(`${baseUrl}/remove`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(productId),
//     credentials: 'include'
//   }).then(res => res.json());
// };