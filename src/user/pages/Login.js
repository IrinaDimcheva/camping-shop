import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import { loginService, getProfile } from '../../services/auth-service';
import styles from './Login.module.css';

const Login = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur' || 'onChange'
  });

  useEffect(() => {
    document.title = props.title;
    getProfile().then(user => {
      setChecked(true);
      if (!user.message) {
        authCtx.login(user);
        navigate('/', { replace: true });
        return;
      }
    })
      .catch(err => {
        console.log(err);
        navigate('/login');
      });

    return () => document.title = '';
  }, [authCtx, navigate, props.title]);

  if (!checked) { return null; }

  const onSubmitHandler = (data, event) => {
    event.preventDefault();
    setIsLoading(true);

    loginService(data)
      .then(user => {
        setIsLoading(false);
        if (!user.ok) {
          setError(user.message);
        }
        if (!user._id) {
          return;
        }
        authCtx.login(user);
        navigate(-1 || '/', { replace: true });
      }).catch(err => {
        setError(err.message);
      });
    setError(null);
  };

  return (
    <>
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
          <p className='error'>{errors.email?.message}</p>
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
          <p className='error'>{errors.password?.message}</p>
          {!!error && <p className='error'>{error}</p>}
          {!isLoading && (
            <button className="btn btn-primary" type='submit'>Login</button>
          )}
        </form>
        <p>Don't have an account? <Link to='/register' className={styles.link}>Create a new user</Link></p>
      </div>
    </>
  );
};

export default Login;
