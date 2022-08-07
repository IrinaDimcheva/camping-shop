import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AuthContext from '../../shared/context/auth-context';
import { registerService } from '../../services/auth-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './Login.module.css';

const Register = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onTouched' || 'onBlur'
  });

  const onSubmitHandler = (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log({ data });
    registerService(data)
      .then(user => {
        setIsLoading(false);
        console.log(user);
        authCtx.login(user);
        navigate('/');
      }).catch(err => {
        setIsLoading(false);
        console.log(err);
        alert(err.message);
      });
    reset();
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner asOverlay />}
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder='Username...'
            {...register('username', {
              required: 'Username is required.',
              minLength: {
                value: 3,
                message: 'Username should be at least 3 characters.'
              },
              maxLength: {
                value: 25,
                message: 'Username should not be longer than 30 characters.'
              }
            })}
          />
        </p>
        <p className={styles.error}>{errors.username?.message}</p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email...'
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[a-z0-9_\.-]{4,}@[a-z]{2,5}\.[a-z]{2,4}$/,
                message: 'Email is not valid.'
              }
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
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters.'
              },
              maxLength: {
                value: 32,
                message: 'Password should not be longer than 32 characters.'
              },
            })}
          />
        </p>
        <p className={styles.error}>{errors.password?.message}</p>
        {!isLoading && (
          <button type='submit' className="btn btn-primary">Register</button>
        )}
      </form>
      <p>Have an account already? <Link to='/login' className={styles.link}>Login</Link></p>
    </div>
  );
}

export default Register;