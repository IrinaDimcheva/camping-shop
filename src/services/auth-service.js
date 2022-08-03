const baseUrl = 'http://localhost:5000/api';

const register = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
}

const login = (data) => {
  return fetch(`${baseUrl}/auth/login`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
}

export {
  register,
  login
}