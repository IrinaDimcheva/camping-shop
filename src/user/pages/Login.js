import { useState } from 'react';
import { Link } from 'react-router-dom';

import { login } from '../../services/auth-service';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChangeHandler = event => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password
    }

    login(userData).then(user => {
      console.log(user);
    });

    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={emailChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={passwordChangeHandler}
          />
        </p>
        <button className="btn btn-primary" type='submit'>Login</button>
      </form>
      <p>Don't have an account? <Link to='/register' className={styles.link}>Create a new user</Link></p>
    </div>
  );
}

export default Login;