import { Link } from "react-router-dom";
import styles from './Login.module.css';

const Register = () => {
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form action="">
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </p>
        <p>
          <label htmlFor="re-password">Repeat Password</label>
          <input type="password" id="re-password" name="rePassword" />
        </p>
        <button className="btn btn-primary">Register</button>
      </form>
      <p>Have an account already? <Link to='/login' className={styles.link}>Login</Link></p>
    </div>
  );
}

export default Register;