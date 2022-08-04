import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
  return (
    <li className={styles.card} >
      {/* <Link to={`/admin/products/${props._id}`} > */}
      <Link to={`/products/${props._id}`} >
        <div className={styles.media}>
          <img className={styles.image} src={props.imageUrl} alt={props.name} />
        </div>
        <div className={styles.content}>
          <h3>{props.name}</h3>
          <p>{props.price.toFixed(2)}BGN</p>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;