import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
  return (
    <li className={styles.card}>
      <Link to={'/products/:id/detail'}>
        <div className={styles.media}>
          <img className={styles.image} src={props.product.imageUrl} alt={props.product.name} />
        </div>
        <div className={styles.content}>
          <h3>{props.product.name}</h3>
          <p>{props.product.price.toFixed(2)}BGN</p>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;