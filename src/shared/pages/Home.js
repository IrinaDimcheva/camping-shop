import { useEffect } from 'react';

import BackToTop from '../../shared/components/UIElements/BackToTop';
import Categories from '../components/Categories';
import Hero from '../components/Hero';

const Home = (props) => {
  useEffect(() => {
    document.title = props.title;

    return () => {
      document.title = '';
    };
  }, [props.title]);

  return (
    <>
      <Hero />
      <Categories />
      <BackToTop />
    </>
  );
};

export default Home;
