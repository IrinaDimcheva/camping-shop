import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../shared/context/auth-context';
import styles from './Hero.module.css';

const Hero = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <section className={styles.media}>
      <img src='/images/hero.jpg' alt="hero" />
      {!isLoggedIn && (
        <div className={styles.content}>
          <h1 className={styles.title}>Register for free now and get 15% off</h1>
          <Link to='/register' className='btn'>Join Now</Link>
        </div>
      )}
    </section>
  );
}

export default Hero;