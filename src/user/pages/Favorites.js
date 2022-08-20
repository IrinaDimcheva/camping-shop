import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getFavorites, removeFromFavorites } from '../../services/user-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import BackToTop from '../../shared/components/UIElements/BackToTop';
import FavoriteItem from '../components/FavoriteItem';
import styles from './Favorites.module.css';

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = props.title;
    setIsLoading(true);
    getFavorites().then(res => {
      setIsLoading(false);
      setFavorites(res);
    }).catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
    return () => document.title = '';
  }, []);

  const removeHandler = (productId) => {
    removeFromFavorites({ productId }).then(() => {
      getFavorites().then(favorites => {
        setFavorites(favorites);
      })
    }).catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      <h2>My Favorites</h2>
      {!isLoading && !favorites.length && (
        <>
          <p>No favorite products added.</p>
          <div className={styles.actions}>
            <Link to='/' className='btn btn-primary'>Browse Collections</Link>
            <Link to='/products' className='btn btn-primary'>All Products</Link>
          </div>
        </>
      )}
      {!!error && <p>{error}</p>}
      <ul className={styles['list-items']}>
        {!isLoading && favorites.length > 0 && (favorites.map(item => (
          <FavoriteItem
            key={item._id}
            _id={item._id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            onRemove={removeHandler}
          />
        )))}
      </ul>
      <BackToTop />
    </div>
  );
};

export default Favorites;