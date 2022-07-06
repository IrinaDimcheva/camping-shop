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
        <hr />
        <p>
          <label htmlFor="full-name">Full Name</label>
          <input type="text" name="fullName" id="full-name" />
        </p>
        <p>
          <label htmlFor="street">Street</label>
          <input type="text" name="street" id="street" />
        </p>
        <p>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" name="postal" id="postal" />
        </p>
        <p>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" />
        </p>
        <button className="btn btn-primary">Register</button>
      </form>
      <p>Have an account already? <Link to='/login' className={styles.link}>Login</Link></p>
    </div>
  );
}

export default Register;