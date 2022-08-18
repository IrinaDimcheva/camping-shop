import { useEffect, useState } from 'react';

import { getFavorites, removeFromFavorites } from '../../services/user-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import FavoriteItem from '../components/FavoriteItem';
import styles from './Favorites.module.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getFavorites().then(res => {
      setIsLoading(false);
      setFavorites(res);
    }).catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  const removeHandler = (productId) => {
    setIsLoading(true);
    removeFromFavorites({ productId }).then(() => {
      getFavorites().then(favorites => {
        setIsLoading(false);
        setFavorites(favorites);
      })
    }).catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      <h2>My Favorites</h2>
      {!!error && <p>{error}</p>}
      <ul className={styles['list-items']}>
        {!isLoading && favorites && (favorites.map(item => (
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
    </div>
  );
};

export default Favorites;