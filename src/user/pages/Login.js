import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { login } from '../../services/auth-service';
import styles from './Login.module.css';
import { useContext } from 'react';
import { useEffect } from 'react';

const Login = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailChangeHandler = event => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
  };

  // useEffect(() => {

  // })

  const loginHandler = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password
    }

    login(userData).then(user => {
      // auth.login(user);
      auth.login({ isLoggedIn: !!user, userId: user._id, isAdmin: user.isAdmin });
      console.log(user);
      console.log(auth.isLoggedIn, auth.userId, auth.isAdmin)
      navigate('/');
    }).catch(err => console.log(err));

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