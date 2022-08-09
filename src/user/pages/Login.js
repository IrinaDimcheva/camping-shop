import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import { loginService } from '../../services/auth-service';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onBlur' || 'onChange'
  });

  const onSubmitHandler = (data, event) => {
    event.preventDefault();
    setIsLoading(true);

    loginService(data)
      .then(user => {
        setIsLoading(false);
        console.log(user);
        authCtx.login(user);
        navigate(-1 || '/');
      }).catch(err => {
        console.log(err);
        alert(err.message);
      });
    reset();
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner asOverlay />}
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email...'
            {...register('email', {
              required: 'Email is required.'
            })}
          />
        </p>
        <p className={styles.error}>{errors.email?.message}</p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password...'
            {...register('password', {
              required: 'Password is required.'
            })}
          />
        </p>
        <p className={styles.error}>{errors.password?.message}</p>
        {!isLoading && (
          <button className="btn btn-primary" type='submit'>Login</button>
        )}
      </form>
      <p>Don't have an account? <Link to='/register' className={styles.link}>Create a new user</Link></p>
    </div>
  );
}

export default Login;