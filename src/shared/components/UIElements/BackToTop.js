import { useState, useEffect, useCallback } from 'react';
import styles from './BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollHandler = useCallback(() => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);
  const scrollToTopHandler = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  return (
    <>
      {isVisible && (
        <span className={styles.scroll} onClick={scrollToTopHandler}>
          <i className="fa-solid fa-arrow-up"></i>
        </span>
      )}
    </>
  );
};

export default BackToTop;