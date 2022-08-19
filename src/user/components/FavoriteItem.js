import { Link } from 'react-router-dom';

import styles from './FavoriteItem.module.css';

const FavoriteItem = (props) => {
  return (
    <li className={styles.item}>
      <div className={styles.media}>
        <img className={styles.image} src={props.imageUrl} alt={props.name} />
      </div>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{props.price.toFixed(2)} BGN</span>
          <Link to={`/products/${props._id}`}>View details</Link>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => props.onRemove(props._id)}>X</button>
      </div>
    </li>
  );
};

export default FavoriteItem;