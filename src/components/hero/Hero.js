import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
// import hero from '../../images/hero.jpg';

const Hero = () => {
  return (
    <section className={styles.media}>
      <img src='/images/hero.jpg' alt="hero" />
      <div className={styles.content}>
        <h1 className={styles.title}>Register for free now and get 15% off</h1>
        <Link to='/register' className='btn'>Join Now</Link>
      </div>
    </section>
  );
}

export default Hero;