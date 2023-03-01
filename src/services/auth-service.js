const baseUrl = process.env.production.REACT_APP_REST_API_URL + '/api';
// const baseUrl = process.env.REACT_APP_REST_API_URL + '/api';

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

const getProfile = async () => {
  return fetch(`${baseUrl}/user/profile`, {
    credentials: 'include'
  }).then(res => res.json());
};

export {
  registerService,
  loginService,
  logoutService,
  getProfile
};
