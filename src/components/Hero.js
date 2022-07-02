import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.media}>
      <div className={styles.content}>
        <h1>Register for free now and get 15% off</h1>
        <Link to='/register' className='button'>Join Now</Link>
      </div>
    </section>
  );
}

export default Hero;