import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form action="">
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </p>
        <button className="btn btn-primary">Login</button>
      </form>
      <p>Don't have an account? <Link to='/register' className={styles.link}>Create a new user</Link></p>
    </div>
  );
}

export default Login;