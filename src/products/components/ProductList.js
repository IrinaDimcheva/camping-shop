import ProductItem from './ProductItem';
import styles from './ProductList.module.css';

const ProductList = (props) => {
  return (
    <ul className={styles.list}>
      {props.items.map(product => {
        return <ProductItem key={product._id} {...product} />
      })}
    </ul>
  );
};

export default ProductList;