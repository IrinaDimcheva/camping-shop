import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.media}>
      <div className={styles.content}>
        <h1>Register now for free and get 15% off</h1>
        <button className='button'>Join Now</button>
      </div>
    </section>
  );
}

export default Hero;