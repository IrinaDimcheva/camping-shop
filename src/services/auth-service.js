const baseUrl = 'http://localhost:5000/api';

const registerService = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
};

const loginService = (data) => {
  return fetch(`${baseUrl}/auth/login`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
};

const logoutService = () => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json())
    .catch(err => console.log(err));

};

export {
  registerService,
  loginService,
  logoutService
};